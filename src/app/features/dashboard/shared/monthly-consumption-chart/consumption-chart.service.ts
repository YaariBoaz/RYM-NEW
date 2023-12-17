import {Injectable} from '@angular/core';
import {ApiService} from "../../../../shared/api.service";
import {LoggerService} from "../../../../shared/services/logger.service";
import {BehaviorSubject, forkJoin} from "rxjs";
import * as moment from "moment";
import {monthlyConsumptionConfig} from "./config";
import {ConsumptionFromToMonthlyObject, DateHelperService} from "../utils/date-helper";

@Injectable({
  providedIn: 'root'
})
export class ConsumptionChartService {
  chartData;
  getChartDataUpdate$ = new BehaviorSubject(null);
  lastRead;

  uom;

  forecast;

  lastMonthlyRead;

  monthlyLowRate;

  constructor(private apiService: ApiService, private dateHelper: DateHelperService) {
    this.getConsumptionMonthly({
      from: moment().subtract("month", 12).format('YYYY-MM-D'),
      to: moment().format('YYYY-MM-D')
    });
  }

   getConsumptionMonthly(dateRange: { from: string, to: string }) {
    const from = moment(dateRange.from).format('YYYY-MM');
    const to = moment(dateRange.to).format('YYYY-MM')
    const lastRead$ = this.apiService.getLastRead();
    const uom$ = this.apiService.getMeasurmentUnitsByMunicipal();
    const forecast$ = this.apiService.getConsumptionForecast();
    const lastMonthlyRead$ = this.apiService.getConsumptionMonthly(from, to, '');
    const monthlyLowRate$ = this.apiService.getConsumptionLowRateLimit();
    forkJoin([lastRead$, uom$, forecast$, lastMonthlyRead$, monthlyLowRate$]).subscribe(([
                                                                                           lastRead,
                                                                                           uom,
                                                                                           forecast,
                                                                                           lastMonthlyRead,
                                                                                           monthlyLowRate,
                                                                                         ]) => {
      this.uom = uom;
      this.lastMonthlyRead = lastMonthlyRead;
      this.lastRead = lastRead;
      this.forecast = forecast;
      this.monthlyLowRate = monthlyLowRate;
      this.prepareDataForCharts(lastMonthlyRead, monthlyLowRate, uom, from, to);
      this.chartData = {
        currentMeterReading: (lastRead as any)[0].read,
        currentMonthConsumption: (lastMonthlyRead as any)[(lastMonthlyRead as any).length - 1].cons,
        endOfMonthForecast: (forecast as any).estimatedConsumption,
        uom: (uom as any).unit,
        monthlyLowRate: (monthlyLowRate as number),
      }
      this.getChartDataUpdate$.next(this.chartData);
      LoggerService.LOG('getConsumptionMonthly', this.chartData);
    });
  }

  prepareDataForCharts(lastMonthlyRead: any, monthlyLowRate: any, uom: any, from, to) {
    monthlyConsumptionConfig.datasets = [];
    const highRate: number[] = [];
    const lowRate: number[] = [];
    const months: ConsumptionFromToMonthlyObject = this.dateHelper.getMonthsSetFromNewMonth(from, to);
    lastMonthlyRead.map(item => {
      const roundedAndSubstracted = Math.round(((item.cons - monthlyLowRate) + Number.EPSILON) * 100) / 100;
      highRate.push(roundedAndSubstracted)
    })
    monthlyConsumptionConfig.labels = months.months.reverse();

    highRate.forEach(item => {
      lowRate.push(monthlyLowRate);
    });
    monthlyConsumptionConfig.datasets.push({
      data: lowRate,
      stack: 'x',
      label: 'Consumption at low rate',
      backgroundColor: '#2271b1',
      uom: uom
    } as any);
    monthlyConsumptionConfig.datasets.push({
      data: highRate,
      stack: 'x',
      label: 'Consumption at high rate',
      backgroundColor: '#F46A6A',
      uom: uom
    } as any);
  }
}
