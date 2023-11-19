import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AlertsState} from "./alerts.reducer";

export const selectAlertsDataState = createFeatureSelector<AlertsState>('alertsState');


export const selectAlertsData = createSelector(
  selectAlertsDataState,
  (state: AlertsState) => state.alerts
);
