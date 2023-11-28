import {Action, createReducer, on} from "@ngrx/store";
import {AlertsState} from "../alerts/alerts.reducer";
import {postVacations, postVacationsDataFail, postVacationsSuccess} from "./vacations.action";

export interface VacationsModel {
  vacationID: string;
  startDate: Date;
  endDate: Date;
  consumptionDailyLimit: 12;
}


export interface VacationsModelState {
  data: VacationsModel;
}


export const initialState: VacationsModelState = {data: null}

export const VacationReducer = createReducer(initialState,
  on(postVacations, (state) => {
    return {...state, loading: true, error: null};
  }), on(postVacationsSuccess, (state, {data}) => {
    return {...state, data, loading: false};
  }),
  on(postVacationsDataFail, (state, {error}) => {
    return {...state, error, loading: false};
  }));


export function reducer(state: VacationsModelState | undefined, action: Action) {
  return VacationReducer(state, action);
}
