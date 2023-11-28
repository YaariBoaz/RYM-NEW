import {createAction, props} from "@ngrx/store";
import {VacationsModel, VacationsModelState} from "./vacations.reducer";

export const postVacations = createAction('[Data] fetch Alerts', props<VacationsModel>());
export const postVacationsSuccess = createAction('[Data] post Vacations Success', props<VacationsModelState>());
export const postVacationsDataFail = createAction('[Data] post Vacations FAIL', props<{ error: string }>());
