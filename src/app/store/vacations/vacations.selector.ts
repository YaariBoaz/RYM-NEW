import {createFeatureSelector, createSelector} from "@ngrx/store";
import {VacationsModelState} from "./vacations.reducer";

export const selectAlertsDataState = createFeatureSelector<VacationsModelState>('vacationsModelState');


export const selectAlertsData = createSelector(
  selectAlertsDataState,
  (state: VacationsModelState) => state.data
);
