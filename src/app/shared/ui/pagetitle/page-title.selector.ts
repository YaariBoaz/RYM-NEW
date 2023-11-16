import {createFeatureSelector, createSelector} from "@ngrx/store";
import {PageTitleState} from "./page-title.reducer";

export const selectUserDataState = createFeatureSelector<PageTitleState>('pageTitle');


export const selectUserName = createSelector(
  selectUserDataState,
  (state: PageTitleState) => {
    return {firstName: state.firstName, lastName:state.lastName}
  }
);


export const selectUserData = createSelector(
  selectUserDataState,
  (state: PageTitleState) => state
);
