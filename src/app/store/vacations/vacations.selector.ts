import {createFeatureSelector, createSelector} from "@ngrx/store";

export const selectAlertsDataState = createFeatureSelector<any>('vacationsModelState');


export const selectAlertsData = createSelector(
  selectAlertsDataState,
  (state: any) => state
);
