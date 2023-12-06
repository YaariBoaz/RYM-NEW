import {createAction, props} from "@ngrx/store";
import {SettingsData} from "./settings.reducer";
import {PhoneNumberItem} from "../../shared/models";

export const fetchSettingsData = createAction('[Data] fetch settings data');
export const updatePhoneNumberData = createAction('[UPDATE] phone number data', props<{ data: PhoneNumberItem }>());
export const updatePhoneNumberDataSuccess = createAction('[UPDATE] phone number data success');
export const updatePhoneNumberDataFail = createAction('[UPDATE] phone number data fail', props<{ error: string }>());
export const fetchSettingsSuccess = createAction('[Data] fetch settings success', props<{ data: SettingsData }>());
export const fetchSettingsFail = createAction('[Data] fetch settings fail', props<{ error: string }>());
