import {createFeatureSelector, createSelector} from "@ngrx/store";
import {LastBillingCycleChartState} from "./lastBillingCycleChart.reducer";

export const selectLastBillingCycleChartDataState = createFeatureSelector<LastBillingCycleChartState>('lastBillingCycleChartState');


export const selectLastBillingCycleChartData = createSelector(
  selectLastBillingCycleChartDataState,
  (state: LastBillingCycleChartState) => state.data
);
