import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {forkJoin} from "rxjs";
import {ApiService} from "../../shared/api.service";
import {fetchCardsData, fetchCardsDataSuccess} from "./cards.action";
import {Store} from "@ngrx/store";
import {fetchConsumptionDataSuccess} from "../consumption/consumption.action";

import {monthlyConsumptionConfig} from "../../features/dashboard/shared/monthly-consumption-chart/config";
import {ConsumptionFromToMonthlyObject, DateHelperService} from "../../features/dashboard/shared/utils/date-helper";
import {tap} from "rxjs/operators";
import * as moment from "moment";

@Injectable()
export class CardsEffects {


  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchCardsData),
      tap((data) => {
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
            this.store.dispatch(fetchCardsDataSuccess({
              data: {
                currentMeterReading: (lastRead as any)[0].read,
                currentMonthConsumption: (lastMonthlyRead as any)[(lastMonthlyRead as any).length - 1].cons,
                endOfMonthForecast: (forecast as any).estimatedConsumption,
                uom: (uom as any).unit,
                monthlyLowRate: (monthlyLowRate as number)
              }
            }));
            this.prepareDataForCharts(lastMonthlyRead, monthlyLowRate, uom, new Date(data.from).getTime(), new Date(data.to).getTime());
            this.store.dispatch(fetchConsumptionDataSuccess())
          })
        }
      )
    ), {dispatch: false}
  )

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

    // (monthlyConsumptionConfig.xAxis as any)[0].data = months.months.reverse();
    // (monthlyConsumptionConfig.yAxis as any)[0].name  = uom.unit;
  }

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store,
    private dateHelper: DateHelperService
  ) {
  }
}
