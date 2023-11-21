import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ApiService} from "../../shared/api.service";
import {catchError, map, mergeMap} from "rxjs/operators";
import {of} from "rxjs";
import {
  fetchConsumptionChartData,
  fetchConsumptionChartDataFail,
  fetchConsumptionChartDataSuccess
} from "./consumption.action";
import {ConsumptionData, ConsumptionState} from "./consumption.reducer";
import {fetchClientAlertsData, fetchClientAlertsDataFail, fetchClientAlertsDataSuccess} from "../alerts/alerts.action";
import {AlertsData} from "../alerts/alerts.reducer";

@Injectable()
export class ConsumptionEffects {


  fetchData$ = createEffect(()=>
    this.actions$.pipe(
      ofType(fetchConsumptionChartData),
      mergeMap(() =>
        this.apiService.getConsumptionMonthly(null,null).pipe(
          map((data:ConsumptionState) => fetchConsumptionChartDataSuccess({data:data})
        )
      ),
    ),
    )
  )


  constructor(private actions$: Actions,private apiService:ApiService) { }



}
