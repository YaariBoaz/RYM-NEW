import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ConsumptionState} from "./consumption.reducer";

export const selectConsumptionDataState = createFeatureSelector<ConsumptionState>('consumptionState');


export const selectConsumptionChartData = createSelector(
  selectConsumptionDataState,
  (state: ConsumptionState) =>state
);

export const selectConsumptionMonths = createSelector(
  selectConsumptionDataState,
  (state: ConsumptionState) => state.months
);

export const selectConsumptionFromToMonths = createSelector(
  selectConsumptionDataState,
  (state: ConsumptionState) => state.fromToMonths
);



export const selectConsumptionFromToDaily = createSelector(
  selectConsumptionDataState,
  (state: ConsumptionState) => state.fromToDaily
);
