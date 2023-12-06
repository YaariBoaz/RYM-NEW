import {createAction, props} from "@ngrx/store";
import {SettingsState} from "./settings.reducer";

export const fetchSettingsData = createAction('[Data] fetch settings data');
export const fetchSettingsDataSuccess = createAction('[Data] fetch settings data', props<SettingsState>());
export const fetchSettingsDataFail = createAction('[Data] fetch settings data', props<{ error: string }>());
