import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {fetchClientAlertsData, fetchClientAlertsDataFail, fetchClientAlertsDataSuccess} from "../alerts/alerts.action";
import {catchError, map, mergeMap} from "rxjs/operators";
import {AlertsData} from "../alerts/alerts.reducer";
import {of} from "rxjs";
import {ApiService} from "../../shared/api.service";
import {postVacations, postVacationsDataFail, postVacationsSuccess} from "./vacations.action";
import {VacationsModel} from "./vacations.reducer";

@Injectable()
export class VacationsEffect {


  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postVacations),
      mergeMap(() =>
        this.apiService.postConsumerVacations().pipe(
          map((data:VacationsModel) => postVacationsSuccess({data})),
          catchError((error) =>
            of(postVacationsDataFail({ error }))
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
