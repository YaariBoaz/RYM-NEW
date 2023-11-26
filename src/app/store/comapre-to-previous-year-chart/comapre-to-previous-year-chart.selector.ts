import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CompareToPreviousYearChartState} from "./comapre-to-previous-year-chart.reducer";

export const selectCompareToPreviousYearChartState = createFeatureSelector<CompareToPreviousYearChartState>('compareToPreviousYearChartState');


export const selectCompareToPreviousYearChartData = createSelector(
  selectCompareToPreviousYearChartState,
  (state: CompareToPreviousYearChartState) => state.data
);
