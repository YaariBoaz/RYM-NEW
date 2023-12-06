import {Action, createReducer, on} from "@ngrx/store";
import {
  fetchSettingsData,
  fetchSettingsDataFail,
  fetchSettingsDataSuccess
} from "./settings.action";

export interface SettingsItem {
  alertTypeId: number;
  mediaTypeId: number;
}

export interface AlertsForSettingsItem {
  alertShowDescription: string;
  alertTypeId: number;
  alertTypeName: string;
  forConsumerDelivery: boolean;
}

export interface SettingsState {
  settings: SettingsItem[];
  alertsFroSettings: AlertsForSettingsItem[];
}

export const initialState: SettingsState = {settings: null, alertsFroSettings: null}


export const SettingsReducer = createReducer(initialState,
  on(fetchSettingsData, (state) => {
    return {...state, loading: true, error: null};
  }), on(fetchSettingsDataSuccess, (state, data: SettingsState) => {
    return {...state, data, loading: true, error: null};
  }),
  on(fetchSettingsDataFail, (state, {error}) => {
    return {...state, error, loading: false};
  }));

export function reducer(state: SettingsState | undefined, action: Action) {
  return SettingsReducer(state, action);
}
