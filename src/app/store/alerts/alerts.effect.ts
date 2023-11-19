// noinspection TypeScriptValidateTypes

import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap} from "rxjs/operators";
import {of} from "rxjs";
import {ApiService} from "../../shared/api.service";
import {fetchClientAlertsData, fetchClientAlertsDataFail, fetchClientAlertsDataSuccess} from "./alerts.action";
import {AlertsData} from "./alerts.reducer";

@Injectable()
export class AlertsEffects {


  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchClientAlertsData),
      mergeMap(() =>
        this.apiService.getMyAlerts().pipe(
          map((alerts:AlertsData[]) => fetchClientAlertsDataSuccess({alerts})),
          catchError((error) =>
            of(fetchClientAlertsDataFail({ error }))
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
