import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap} from "rxjs/operators";
import {of} from "rxjs";
import {ApiService} from "../../shared/api.service";
import {DateHelperService} from "../../pages/dashboards/saas/shared/utils/date-helper";
import {
  fetchComparePreviousYearChartData, fetchComparePreviousYearChartDataFail, fetchComparePreviousYearChartDataSuccess
} from "./comapre-to-previous-year-chart.action";
import {CompareToPreviousYearChartData} from "./comapre-to-previous-year-chart.reducer";
import {compareToPreviousConfig} from "../../pages/dashboards/saas/shared/monthly-consumption-chart/config";

@Injectable()
export class CompareToPreviousYearChartEffect {

  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchComparePreviousYearChartData),
      mergeMap((fetchCompareToPreviousYearChartData) =>
        this.apiService.getConsumptionMonthly(fetchCompareToPreviousYearChartData.from, fetchCompareToPreviousYearChartData.to).pipe(
          map((data: CompareToPreviousYearChartData[]) => {
            this.prepareDataForCharts(data, fetchCompareToPreviousYearChartData.from, fetchCompareToPreviousYearChartData.to);
            return fetchComparePreviousYearChartDataSuccess({data});
          }),
          catchError((error) =>
            of(fetchComparePreviousYearChartDataFail({error}))
          ),
        )
      ),
    ),
  )


  private prepareDataForCharts(data: CompareToPreviousYearChartData[], from, to) {

    const year1: any[] = [];
    const year2: any[] = [];
    const year3: any[] = [];
    const xAxis: string[] = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC']
    let monthIndex = 12;
    data.map((item, index) => {
      if (index >= 0 && index <= 12) {
        year1.push(Math.round((item.cons + Number.EPSILON) * 100) / 100);
      } else if (index >= 13 && index <= 24) {
        year2.push(Math.round((item.cons + Number.EPSILON) * 100) / 100);
      } else {
        year3.push(Math.round((item.cons + Number.EPSILON) * 100) / 100);
      }
    })
    compareToPreviousConfig.datasets = [];
    compareToPreviousConfig.datasets.push({
      data: year1,
      label: new Date(data[0].consDate).getFullYear().toString(),
      backgroundColor: '#acacac'
    });
    compareToPreviousConfig.datasets.push({
      data: year2,
      label: new Date(data[13].consDate).getFullYear().toString(),
      backgroundColor: '#1cd3d2'
    });
    compareToPreviousConfig.datasets.push({
      data: year3,
      label: new Date(data[28].consDate).getFullYear().toString(),
      backgroundColor: '#3daefa'
    });
    compareToPreviousConfig.labels = xAxis;
  }

  constructor(private actions$: Actions,
              private apiService: ApiService,
              private dateHelper: DateHelperService) {
  }


}
