import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap} from "rxjs/operators";
import {of} from "rxjs";
import {ApiService} from "../../shared/api.service";
import {
  fetchLastBillingCycleData,
  fetchLastBillingCycleDataSuccess,
  fetchLastBillingCycleFail
} from "./lastBillingCycleChart.action";
import {LastBillingCycleChartData} from "./lastBillingCycleChart.reducer";
import {DateHelperService} from "../../pages/dashboards/saas/shared/utils/date-helper";
import {
  dailyConsumptionConfig,
} from "../../pages/dashboards/saas/shared/monthly-consumption-chart/config";

@Injectable()
export class LastBillingCycleChartStateEffects {


  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchLastBillingCycleData),
      mergeMap((fetchLastBillingCycleData) =>
        this.apiService.getConsumptionLastBillingCycleBetweenDates(fetchLastBillingCycleData.from, fetchLastBillingCycleData.to).pipe(
          map((data: LastBillingCycleChartData[]) => {
            this.prepareDataForCharts(data, fetchLastBillingCycleData.from, fetchLastBillingCycleData.to);
            return fetchLastBillingCycleDataSuccess({data});
          }),
          catchError((error) =>
            of(fetchLastBillingCycleFail({error}))
          ),
        )
      ),
    ),
  )

  private prepareDataForCharts(data, from, to) {

    const real: any[] = [];
    const estimate: any[] = [];
    const days: number[] = this.dateHelper.dagetDaysSetFromNewRange(from, to);
    data.map(item => {
      if (item.estimationType=== 0) {
          real.push((Math.round((item.cons + Number.EPSILON) * 100) / 100));
      } else {
        estimate.push(Math.round((item.cons + Number.EPSILON) * 100) / 100)
      }
    })
    dailyConsumptionConfig.datasets = [];
    dailyConsumptionConfig.datasets.push({
      data: real,
      label: 'Real',
    });
    dailyConsumptionConfig.datasets.push({
      data: estimate,
      label: 'Estimate',
    });
    dailyConsumptionConfig.labels = days;
  }


  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private dateHelper: DateHelperService
  ) {
  }

}
