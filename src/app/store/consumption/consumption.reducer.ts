import {Action, createReducer, on} from "@ngrx/store";
import {
  fetchConsumptionChartDataSuccess,
  fetchConsumptionData,
  fetchConsumptionDataFail,
  fetchConsumptionDataSuccess, getMonthsConsumptionFromToData, updateDailyConsumptionFromToData,
  updateMonthsConsumptionData, updateMonthsConsumptionFromToData
} from "./consumption.action";
import {ClientMeterState} from "../meters/meters.reducer";
import {UOM} from "../cards/cards.reducer";


export interface ConsumptionData {
  meterCount: string,
  consDate: Date,
  cons: number,
  estimationType: string,
  commonCons: string,
  meterStatusDesc: string

}

export interface MonthsSet {
  months: string[];
}

export interface FromToSet {
  from: string;
  to: string;
}

export interface ConsumptionState {
  data: ConsumptionData[];
  lowRead: number;
  uom: UOM;
  months: MonthsSet;
  fromToMonths: FromToSet;
  fromToDaily: FromToSet;
}

export const initialState: ConsumptionState = {data: [], lowRead: null, uom: null, months: null,fromToMonths:null,fromToDaily:null}


export const ConsumptionReducer = createReducer(initialState,
  on(fetchConsumptionData, (state) => {
    return {...state, loading: true, error: null};
  }), on(fetchConsumptionDataSuccess, (state) => {
    return {...state, loading: false};
  }),on(fetchConsumptionChartDataSuccess, (data) => {
    return {...data, loading: false};
  }),
  on(updateMonthsConsumptionData, (state, months) => {
    return {...state, ...months, loading: false};
  }),
  on(updateMonthsConsumptionFromToData, (state, fromToMonths) => {
    return {...state, ...fromToMonths, loading: false};
  }),
  on(updateDailyConsumptionFromToData, (state, fromToDaily) => {
    return {...state, ...fromToDaily, loading: false};
  }),
  on(getMonthsConsumptionFromToData, (state) => {
    return {...state, loading: false};
  }),
  on(fetchConsumptionDataFail, (state, {error}) => {
    return {...state, error, loading: false};
  }));


export function reducer(state: ConsumptionState | undefined, action: Action) {
  return ConsumptionReducer(state, action);
}
