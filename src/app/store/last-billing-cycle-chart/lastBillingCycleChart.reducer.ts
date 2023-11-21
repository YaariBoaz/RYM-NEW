import {createReducer, on} from "@ngrx/store";
import {
  fetchLastBillingCycleData,
  fetchLastBillingCycleDataSuccess,
  fetchLastBillingCycleFail
} from "./lastBillingCycleChart.action";

export interface LastBillingCycleChartData{
  commonCons:any;
  cons:number;
  consDate:Date;
  estimationType:number;
  meterCount:number;
  meterStatusDesc:string;
}
export interface LastBillingCycleChartState{
  data:LastBillingCycleChartData[];
}

export const initialState:LastBillingCycleChartState = {data:null};


export const LastBillingCycleChartStateReducer = createReducer(initialState,
  on(fetchLastBillingCycleData, (state) => {
    return { ...state, loading: true, error: null };
  }), on(fetchLastBillingCycleDataSuccess, (state,  {data}) => {
    return { ...state, data, loading: false };
  }),
  on(fetchLastBillingCycleFail, (state, { error }) => {
    return { ...state, error, loading: false };
  }));
