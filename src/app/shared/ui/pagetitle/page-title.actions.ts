import {createAction, props} from "@ngrx/store";
import {PageTitleState} from "./page-title.reducer";

export const getPageTitleData = createAction('[PAGE TITLE] get data');

export const getPageTitleDataSuccess = createAction('[PAGE TITLE] get data success', props<PageTitleState>())

export const getPageTitleDataSuccessFail = createAction('[PAGE TITLE] get data FAILED', props<{ error: string }>())
