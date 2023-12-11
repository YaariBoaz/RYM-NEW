import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ApiService} from "../../shared/api.service";
import {tap} from "rxjs/operators";
import {forkJoin, of} from "rxjs";
import {fetchContactUsData, fetchContactUsDataFail, fetchContactUsDataSuccess} from "./contact-us.action";
import {Store} from "@ngrx/store";

@Injectable()
export class ContactUsEffect {


  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchContactUsData),
      tap((fetchCardsData) => {
          const contactDetails$ = this.apiService.getMunicipalCustomerService();
          const messagesSubjects$ = this.apiService.getMessagesSubjectsFromMunicipal();
          forkJoin([contactDetails$, messagesSubjects$]).subscribe(([
                                                                       contactDetails,
                                                                      messageSubject]) => {
            this.store.dispatch(fetchContactUsDataSuccess({data:{contactDetails:(contactDetails as any),messageSubject:(messageSubject as any)}}))
          },error => {
            this.store.dispatch(fetchContactUsDataFail(error));
          })
        }
      )
    ),{dispatch: false}
  )

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store:Store
  ) {
  }
}

