import {Action, createReducer, on} from "@ngrx/store";
import {fetchClientMetersData, fetchClientMetersDataFail, fetchClientMetersDataSuccess} from "./meters.action";

export interface MeterData{
  meterCount:number;
  mererSn:string;
  fullAddress:string;
}
export interface ClientMeterState{
  meters:MeterData[];
}
export const initialState: ClientMeterState = { meters: []}


export const ClientMeterReducer = createReducer(initialState,
  on(fetchClientMetersData, (state) => {
    return { ...state, loading: true, error: null };
  }), on(fetchClientMetersDataSuccess, (state,  {meters}) => {
  return { ...state, meters, loading: false };
}),
  on(fetchClientMetersDataFail, (state, { error }) => {
    return { ...state, error, loading: false };
  }));


export function reducer(state: ClientMeterState | undefined, action: Action) {
  return ClientMeterReducer(state, action);
}
