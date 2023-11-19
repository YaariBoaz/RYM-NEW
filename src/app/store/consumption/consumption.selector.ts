import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ConsumptionState} from "./consumption.reducer";

export const selectConsumptionDataState = createFeatureSelector<ConsumptionState>('consumptionState');


export const selectConsumptionChartData = createSelector(
  selectConsumptionDataState,
  (state: ConsumptionState) => state
);

export const selectConsumptionMonths = createSelector(
  selectConsumptionDataState,
  (state: ConsumptionState) => state.months
);
