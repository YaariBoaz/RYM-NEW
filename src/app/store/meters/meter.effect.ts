import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap} from "rxjs/operators";
import {of} from "rxjs";
import {ApiService} from "../../shared/api.service";
import {fetchClientMetersData, fetchClientMetersDataFail, fetchClientMetersDataSuccess} from "./meters.action";
import {ClientMeterState, MeterData} from "./meters.reducer";

@Injectable()
export class MetersListEffects {


  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchClientMetersData),
      mergeMap(() =>
        this.apiService.getConsumerMeters().pipe(
          map((meters:MeterData[]) => fetchClientMetersDataSuccess({meters})),
          catchError((error) =>
            of(fetchClientMetersDataFail({ error }))
          )
        )
      ),
    ),
  )

  constructor(
    private actions$: Actions,
    private apiService:ApiService
  ) { }

}
