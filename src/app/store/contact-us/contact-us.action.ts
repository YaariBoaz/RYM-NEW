import {createAction, props} from "@ngrx/store";
import {ContactUsDetailsState} from "./contact-us.reducer";

export const fetchContactUsData = createAction('[Data] fetch Contact Us');
export const fetchContactUsDataSuccess = createAction('[Data] fetch Contact Us success', props<ContactUsDetailsState>());
export const fetchContactUsDataFail = createAction('[Data] fetch Contact Us fail',props<{ error: string }>());
