import {Action, createReducer, on} from "@ngrx/store";
import {fetchSettingsData, fetchSettingsFail, fetchSettingsSuccess} from "./settings.action";

export interface SettingsData {
  settings: SettingsItem[];
  alertsForSettings:AlertForSettingsItem[];
}

export interface SettingsState{
  data:SettingsData;
}
export interface AlertForSettingsItem{
  alertShowDescription:string;
  alertTypeId:number;
  alertTypeName:String;
  forConsumerDelivery:boolean;
}
export interface SettingsItem{
  alertTypeId:number;
  mediaTypeId:number;
}
export  const initialState:SettingsState = {
  data:{
    settings: null,
    alertsForSettings : null
  }
}


export const SettingsReducer = createReducer(initialState,
  on(fetchSettingsData, (state) => {
    return { ...state, loading: true, error: null };
  }), on(fetchSettingsSuccess, (state,  {data}) => {
    return { ...state, data, loading: false };
  }),
  on(fetchSettingsFail, (state, { error }) => {
    return { ...state, error, loading: false };
  }));


export function reducer(state: SettingsState | undefined, action: Action) {
  return SettingsReducer(state, action);
}
