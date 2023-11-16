import {createAction, props} from "@ngrx/store";
import {ClientMeterState, MeterData} from "./meters.reducer";

export const fetchClientMetersData = createAction('[Data] fetch ClientMeters');
export const fetchClientMetersDataSuccess = createAction('[Data] fetch ClientMeters success', props<ClientMeterState>());
export const fetchClientMetersDataFail = createAction('[Data] fetch ClientMeters fail',props<{ error: string }>());
