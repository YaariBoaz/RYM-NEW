import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ApiService} from "../../shared/api.service";
import {map, mergeMap} from "rxjs/operators";
import {
  fetchConsumptionChartData,
  fetchConsumptionChartDataSuccess
} from "./consumption.action";
import {ConsumptionState} from "./consumption.reducer";

@Injectable()
export class ConsumptionEffects {


  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchConsumptionChartData),
      mergeMap(() =>
        this.apiService.getConsumptionMonthly(null, null).pipe(
          map((data: ConsumptionState) => fetchConsumptionChartDataSuccess({data: data})
          )
        ),
      ),
    )
  )


  constructor(private actions$: Actions, private apiService: ApiService) {
  }


}
