import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ApiService} from "../../shared/api.service";
import {catchError, map, mergeMap} from "rxjs/operators";
import {of} from "rxjs";
import {fetchContactUsData, fetchContactUsDataFail, fetchContactUsDataSuccess} from "./contact-us.action";
import {ContactUsDetails} from "./contact-us.reducer";

@Injectable()
export class ContactUsEffect {


  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchContactUsData),
      mergeMap(() =>
        this.apiService.getMunicipalCustomerService().pipe(
          map((data: ContactUsDetails) => fetchContactUsDataSuccess({data})),
          catchError((error) =>
            of(fetchContactUsDataFail({error}))
          )
        )
      ),
    ),
  )


  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {
  }
}
