import {createFeatureSelector, createSelector} from "@ngrx/store";
import {ContactUsDetailsState} from "./contact-us.reducer";

export const selectContactUsDataState = createFeatureSelector<ContactUsDetailsState>('contactUsDetailsState');


export const selectContactUsData = createSelector(
  selectContactUsDataState,
  (state: ContactUsDetailsState) => state.data
);
