import {createAction, props} from "@ngrx/store";
import {AlertsState} from "./alerts.reducer";

export const fetchClientAlertsData = createAction('[Data] fetch Alerts');
export const fetchClientAlertsDataSuccess = createAction('[Data] fetch Alerts success', props<AlertsState>());
export const fetchClientAlertsDataFail = createAction('[Data] fetch Alerts fail',props<{ error: string }>());
