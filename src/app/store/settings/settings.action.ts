import {createAction, props} from "@ngrx/store";
import {SettingsData} from "./settings.reducer";

export const fetchSettingsData = createAction('[Data] fetch settings data');
export const fetchSettingsSuccess = createAction('[Data] fetch settings success', props<{ data: SettingsData }>());
export const fetchSettingsFail = createAction('[Data] fetch settings fail', props<{ error: string }>());
