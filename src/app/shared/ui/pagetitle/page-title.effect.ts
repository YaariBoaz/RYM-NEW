import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {catchError, map, mergeMap, tap} from "rxjs/operators";
import {of, pipe} from "rxjs";
import {ApiService} from "../../api.service";
import {getPageTitleData, getPageTitleDataSuccess, getPageTitleDataSuccessFail} from "./page-title.actions";
import {PageTitleState} from "./page-title.reducer";
import {Store} from "@ngrx/store";
import {
  fetchClientMetersData,
  fetchClientMetersDataFail,
  fetchClientMetersDataSuccess
} from "../../../store/meters/meters.action";
import {MeterData} from "../../../store/meters/meters.reducer";

@Injectable()
export class PageTitleEffect {

  fetchPageTitleData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchClientMetersData),
      mergeMap(() =>
        this.apiService.getUserDetails().pipe(
          map((data:PageTitleState) => getPageTitleDataSuccess(data)),
          catchError((error) =>
            of(getPageTitleDataSuccessFail({ error }))
          )
        )
      ),
    ),
  )

  constructor(private actions$: Actions,private apiService:ApiService,private store:Store){

  }

}
