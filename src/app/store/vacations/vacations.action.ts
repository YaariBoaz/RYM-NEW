import {createAction, props} from "@ngrx/store";
import {VacationsModel, VacationsModelState} from "./vacations.reducer";


export const postVacations = createAction('[POST] fetch Vacations', props<VacationsModel>());
export const postVacationsSuccess = createAction('[Data] post Vacations SUCCESS', props<VacationsModelState>());
export const postVacationsDataFail = createAction('[Data] post Vacations FAIL', props<{ error: string }>());
export const getVacations = createAction('[GET] fetch Vacations');
export const getVacationsSuccess = createAction('[Data] fetch Vacations SUCCESS', props<VacationsModelState>());
export const getVacationsFail = createAction('[Data] fetch Vacations FAIL', props<{ error:string }>());
