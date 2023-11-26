import {createAction, props} from "@ngrx/store";
import {CompareToPreviousYearChartState} from "./comapre-to-previous-year-chart.reducer";

export const fetchComparePreviousYearChartData = createAction('[Data] Compare Previous Year Chart Data', props<{from:string,to:string}>());
export const fetchComparePreviousYearChartDataSuccess = createAction('[Data] Compare Previous Year Chart Data success', props<CompareToPreviousYearChartState>());
export const fetchComparePreviousYearChartDataFail = createAction('[Data] LCompare Previous Year Chart Data fail',props<{ error: string }>());

