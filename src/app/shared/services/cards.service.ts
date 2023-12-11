import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";
import * as moment from "moment/moment";
import {forkJoin} from "rxjs";
import {monthlyConsumptionConfig} from "../../features/dashboard/shared/monthly-consumption-chart/config";
import {ConsumptionFromToMonthlyObject, DateHelperService} from "../../features/dashboard/shared/utils/date-helper";
import {LoggerService} from "./logger.service";

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  private cardsData;
  private uom: any;

  constructor(private apiService: ApiService,private dateHelper:DateHelperService) {
    this.fetchCardsData({from: new Date().toString(),to: new Date().toString()})
  }

  fetchCardsData(data: { from: string, to: string }) {
    const lastRead$ = this.apiService.getLastRead();
    const uom$ = this.apiService.getMeasurmentUnitsByMunicipal();
    const forecast$ = this.apiService.getConsumptionForecast();
    const lastMonthlyRead$ = this.apiService.getConsumptionMonthly(moment(data.from).format('YYYY-MM'), moment(data.to).format('YYYY-MM'), '');
    const monthlyLowRate$ = this.apiService.getConsumptionLowRateLimit();
    forkJoin([lastRead$, uom$, forecast$, lastMonthlyRead$, monthlyLowRate$]).subscribe(([
                                                                                           lastRead,
                                                                                           uom,
                                                                                           forecast,
                                                                                           lastMonthlyRead,
                                                                                           monthlyLowRate]) => {

      this.cardsData = {
        currentMeterReading: (lastRead as any)[0].read,
        currentMonthConsumption: (lastMonthlyRead as any)[(lastMonthlyRead as any).length - 1].cons,
        endOfMonthForecast: (forecast as any).estimatedConsumption,
        uom: (uom as any).unit,
        monthlyLowRate: (monthlyLowRate as number)
      }
      this.prepareDataForCharts(lastMonthlyRead, monthlyLowRate, uom, new Date(data.from).getTime(), new Date(data.to).getTime());
      LoggerService.LOG('getUserDetails  - ' ,this.cardsData)
    });
  }
  private prepareDataForCharts(lastMonthlyRead: any, monthlyLowRate: any, uom: any, from, to) {
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

  getCardsData(){
    return this.cardsData;
  }

  getUOM(){
    return this.uom;
  }
}



