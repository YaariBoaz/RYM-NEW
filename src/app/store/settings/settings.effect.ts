import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {ApiService} from "../../shared/api.service";
import {Store} from "@ngrx/store";
import {DateHelperService} from "../../features/dashboard/shared/utils/date-helper";
import {fetchSettingsData, fetchSettingsDataSuccess} from "./settings.action";
import {tap} from "rxjs/operators";
import {forkJoin} from "rxjs";
import {SettingsState} from "./settings.reducer";

@Injectable()
export class SettingsEffect {


  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: Store,
    private dateHelper: DateHelperService
  ) {
  }


  fetchData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchSettingsData),
      tap(() => {
        const settings$ = this.apiService.getSettings();
        const alertsForSettings$ = this.apiService.getConsumerAlertsForSettings();
        forkJoin([settings$, alertsForSettings$]).subscribe(([
                                                               settings,
                                                               alertsFroSettings]) => {
          this.store.dispatch(fetchSettingsDataSuccess({settings, alertsFroSettings} as SettingsState))
        });
      })
    ), {dispatch: false}
  )
}
