import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, switchMap, tap} from "rxjs/operators";
import {forkJoin, of, pipe} from "rxjs";
import {ApiService} from "../../shared/api.service";
import {fetchCardsData, fetchCardsDataFail, fetchCardsDataSuccess} from "./cards.action";
import {CardsData, UOM} from "./cards.reducer";
import {loader} from "../utili.action";
import {Store} from "@ngrx/store";
import {fetchConsumptionDataSuccess} from "../consumption/consumption.action";
import {AlertsData} from "../alerts/alerts.reducer";
import {ConsumptionData} from "../consumption/consumption.reducer";
import * as moment from "moment/moment";
import {monthlyConsumptionConfig} from "../../pages/dashboards/saas/shared/monthly-consumption-chart/config";
import {DateHelper} from "../../pages/dashboards/saas/shared/utils/date-helper";

@Injectable()
export class CardsEffects {


  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchCardsData),
      tap(() => {
          const lastRead$ = this.apiService.getLastRead();
          const uom$ = this.apiService.getMeasurmentUnitsByMunicipal();
          const forecast$ = this.apiService.getConsumptionForecast();
          const lastMonthlyRead$ = this.apiService.getConsumptionMonthly('', '', '');
          const monthlyLowRate$ = this.apiService.getConsumptionLowRateLimit();
          forkJoin([lastRead$, uom$, forecast$, lastMonthlyRead$,monthlyLowRate$]).subscribe(([
            lastRead,
            uom,
            forecast,
            lastMonthlyRead,
            monthlyLowRate]) => {
            this.store.dispatch(fetchCardsDataSuccess({
              data: {
                currentMeterReading: (lastRead as any)[0].read,
                currentMonthConsumption: (lastMonthlyRead as any)[(lastMonthlyRead as any).length-1].cons,
                endOfMonthForecast: (forecast as any).estimatedConsumption,
                uom: (uom as any).unit,
                monthlyLowRate:(monthlyLowRate as number)
              }
            }));
            this.prepareDataForCharts(lastMonthlyRead,monthlyLowRate,uom);
            this.store.dispatch(fetchConsumptionDataSuccess())
          })
        }
      )
    ),{dispatch:false}
  )

  private prepareDataForCharts(lastMonthlyRead: any, monthlyLowRate: any, uom: any) {

      const highRate: number[] = [];
      const lowRate: number[] = [];
      const months:string[] = DateHelper.InitialDatesForChart();
      lastMonthlyRead.map(item => {
        const roundedAndSubstracted = Math.round(((item.cons - monthlyLowRate) + Number.EPSILON) * 100) / 100;
        highRate.push(roundedAndSubstracted)
      })
      monthlyConsumptionConfig.series = [
        {
          data: highRate,
          type: 'bar',
          stack: 'x',
          name:'Consumption at low rate'
        }
      ]
      highRate.forEach(item => {
        lowRate.push(monthlyLowRate);
      });
      monthlyConsumptionConfig.series.push({
        data: lowRate,
        type: 'bar',
        stack: 'x',
        name:'Consumption at high rate'
      });

      (monthlyConsumptionConfig.xAxis as any)[0].data = months.reverse();
      (monthlyConsumptionConfig.yAxis as any)[0].name  = uom.unit;



  }

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store:Store
  ) {
  }
}
