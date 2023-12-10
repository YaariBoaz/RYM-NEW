import {Actions, createEffect, ofType} from "@ngrx/effects";
import {fetchCardsData, fetchCardsDataSuccess} from "../cards/cards.action";
import {tap} from "rxjs/operators";
import * as moment from "moment/moment";
import {forkJoin} from "rxjs";
import {fetchConsumptionDataSuccess} from "../consumption/consumption.action";
import {Injectable} from "@angular/core";
import {ApiService} from "../../shared/api.service";
import {Store} from "@ngrx/store";
import {fetchSettingsData, fetchSettingsSuccess} from "./settings.action";
import {AlertForSettingsItem, SettingsItem} from "./settings.reducer";

@Injectable()
export class SettingsEffect {
  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchSettingsData),
      tap((data) => {
          const settings$ = this.apiService.getConsumerSettings();
          const alertsForSettings$ = this.apiService.getConsumerAlertsForSettings();
          forkJoin([settings$, alertsForSettings$]).subscribe(([
                                                                 settings,
                                                                 alertsForSettings]) => {
            this.store.dispatch(fetchSettingsSuccess({
              data: {
                settings: settings as SettingsItem[],
                alertsForSettings: alertsForSettings as AlertForSettingsItem[]
              }
            }));
          })
        }
      )
    ), {dispatch: false}
  )

  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store,
  ) {
  }

}
