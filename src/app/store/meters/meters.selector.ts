import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ClientMeterState} from "./meters.reducer";

export const selectMetersDataState = createFeatureSelector<ClientMeterState>('clientMeters');


export const selectMetersData = createSelector(
  selectMetersDataState,
  (state: ClientMeterState) => state
);
