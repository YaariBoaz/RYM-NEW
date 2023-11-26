import {createReducer, on} from "@ngrx/store";
import {
  fetchComparePreviousYearChartData,
  fetchComparePreviousYearChartDataFail,
  fetchComparePreviousYearChartDataSuccess,
} from "./comapre-to-previous-year-chart.action";

export interface CompareToPreviousYearChartData{
  commonCons:any;
  cons:number;
  consDate:Date;
  estimationType:number;
  meterCount:number;
  meterStatusDesc:string;
}

export interface CompareToPreviousYearChartState{
  data:CompareToPreviousYearChartData[];
}

export const initialState:CompareToPreviousYearChartState = {data:null};


export const CompareToPreviousYearChartReducer = createReducer(initialState,
  on(fetchComparePreviousYearChartData, (state) => {
    return { ...state, loading: true, error: null };
  }), on(fetchComparePreviousYearChartDataSuccess, (state,  {data}) => {
    return { ...state, data, loading: false };
  }),
  on(fetchComparePreviousYearChartDataFail, (state, { error }) => {
    return { ...state, error, loading: false };
  }));
