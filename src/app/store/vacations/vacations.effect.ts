import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, tap} from "rxjs/operators";
import {of} from "rxjs";
import {ApiService} from "../../shared/api.service";
import {getVacationsSuccess, postVacations, postVacationsDataFail, postVacationsSuccess} from "./vacations.action";
import {VacationsModel} from "./vacations.reducer";

@Injectable()
export class VacationsEffect {


  postVacation$ = createEffect(() =>
    this.actions$.pipe(
      ofType(postVacations),
      mergeMap((data: VacationsModel) =>
        this.apiService.postConsumerVacations(data).pipe(
          map((data: VacationsModel) => postVacationsSuccess({data,null})),
          catchError((error) =>
            of(postVacationsDataFail({error}))
          )
        )
      ),
    ), {dispatch: false}
  )


  getVacations = createEffect(() =>
    this.actions$.pipe(
      ofType(postVacations),
      mergeMap((data: VacationsModel) =>
        this.apiService.getConsumerVacations().pipe(
          map((data: VacationsModel) => getVacationsSuccess({vacations})),
          catchError((error) =>
            of(postVacationsDataFail({error}))
          )
        )
      ),
    ), {dispatch: false}
  )

  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {
  }


}
