import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap} from "rxjs/operators";
import {of, pipe} from "rxjs";
import {ApiService} from "../../shared/api.service";
import {
  fetchLastBillingCycleData,
  fetchLastBillingCycleDataSuccess,
  fetchLastBillingCycleFail
} from "./lastBillingCycleChart.action";
import {LastBillingCycleChartData} from "./lastBillingCycleChart.reducer";
import {ConsumptionFromToMonthlyObject, DateHelperService} from "../../pages/dashboards/saas/shared/utils/date-helper";
import {monthlyConsumptionConfig} from "../../pages/dashboards/saas/shared/monthly-consumption-chart/config";

@Injectable()
export class LastBillingCycleChartStateEffects {


  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchLastBillingCycleData),
      mergeMap((fetchLastBillingCycleData) =>
        this.apiService.getConsumptionLastBillingCycleBetweenDates(fetchLastBillingCycleData.from,fetchLastBillingCycleData.to).pipe(
          map((data:LastBillingCycleChartData[]) => {
            this.prepareDataForCharts(data,fetchLastBillingCycleData.from,fetchLastBillingCycleData.to);
            return fetchLastBillingCycleDataSuccess({data});
          }),
          catchError((error) =>
            of(fetchLastBillingCycleFail({ error }))
          ),
        )
      ),
    ),
  )

  private prepareDataForCharts(data,from,to) {

    const real: number[] = [];
    const estimate: number[] = [];
    const days:number[]= this.dateHelper.dagetDaysSetFromNewRange(from,to);
    data.map(item => {
      if(item.estimationType === 0){
        real.push( Math.round((item.cons + Number.EPSILON) * 100) / 100)
      }else{
        estimate.push( Math.round((item.cons + Number.EPSILON) * 100) / 100)
      }
    })
    monthlyConsumptionConfig.series = [
      {
        data: real,
        type: 'bar',
        stack: 'x',
        name:'Real'
      }
    ]
    monthlyConsumptionConfig.series.push({
      data: estimate,
      type: 'bar',
      stack: 'x',
      name:'Estimation'
    });

    (monthlyConsumptionConfig.xAxis as any)[0].data = days.reverse();
  }


  constructor(
    private actions$: Actions,
    private apiService:ApiService,
    private dateHelper:DateHelperService
  ) { }

}
