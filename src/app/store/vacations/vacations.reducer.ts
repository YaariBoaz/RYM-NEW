import {Action, createReducer, on} from "@ngrx/store";
import {AlertsState} from "../alerts/alerts.reducer";
import {
  getVacations,
  getVacationsSuccess,
  postVacations,
  postVacationsDataFail,
  postVacationsSuccess
} from "./vacations.action";

//{"vacationID":0,"startDate":"2023-12-13T00:00:00.000+00:00","endDate":"2025-12-27T00:00:00.000+00:00","consumptionDailyLimit":23}
export interface VacationsModel {
  vacationID: number;
  startDate: string;
  endDate: string;
  consumptionDailyLimit: string;
}


export interface VacationsModelState {
  data: VacationsModel;
  vacations: VacationsModel[]
}


export const initialState: VacationsModelState = {data: null, vacations: null}

export const VacationReducer = createReducer(initialState,
  on(postVacations, (state) => {
    return {...state, loading: true, error: null};
  }), on(postVacationsSuccess, (state, {data}) => {
    return {...state, data, loading: false};
  }),
  on(postVacationsDataFail, (state, {error}) => {
    return {...state, error, loading: false};
  }),
  on(getVacations, (state) => {
    return {...state, loading: false};
  }),
  on(getVacationsSuccess, (state, {vacations}) => {
    return {...state, vacations, loading: false};
  }));


export function reducer(state: VacationsModelState | undefined, action: Action) {
  return VacationReducer(state, action);
}
