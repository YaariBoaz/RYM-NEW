import {Action, createReducer, on} from "@ngrx/store";
import {fetchClientAlertsData, fetchClientAlertsDataFail, fetchClientAlertsDataSuccess} from "./alerts.action";

export interface AlertsData{
  alertTime:Date;
  alertTypeId:string;
  alertTypeName:string;
  isRead:boolean;
  logId:string;
  meterCount:string;
  meterSn:string
  notificationType:string;
}
export interface AlertsState{
  alerts:AlertsData[];
}
export const initialState: AlertsState = { alerts: []}


export const AlertsReducer = createReducer(initialState,
  on(fetchClientAlertsData, (state) => {
    return { ...state, loading: true, error: null };
  }), on(fetchClientAlertsDataSuccess, (state,  {alerts}) => {
    return { ...state, alerts, loading: false };
  }),
  on(fetchClientAlertsDataFail, (state, { error }) => {
    return { ...state, error, loading: false };
  }));


export function reducer(state: AlertsState | undefined, action: Action) {
  return AlertsReducer(state, action);
}
