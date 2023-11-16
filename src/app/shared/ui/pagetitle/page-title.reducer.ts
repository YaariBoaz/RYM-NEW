import {Action, createReducer, on} from "@ngrx/store";
import {fetchmailData, fetchmailFail, fetchmailSuccess} from "../../../store/Email/email.action";
import {getPageTitleData, getPageTitleDataSuccess} from "./page-title.actions";
import {MailReducer, MailState} from "../../../store/Email/email.reducer";

export interface PageTitleState {
  firstName: string;
  lastName: string;
  accountNumber: string;
  phoneNumber:{
    countryCode:string;
    phoneNumber:string;
    AdditionalPhoneNumber:string;
  },
  municipalId:string;
  loading: boolean;
  error: any;
}

export const initialState: PageTitleState = {
  firstName: '',
  lastName: '',
  accountNumber: '',
  phoneNumber:{
    countryCode:'',
    phoneNumber:'',
    AdditionalPhoneNumber:'',
  },
  municipalId:'',
  loading: false,
  error: null,

};


export const PageTitleReducer = createReducer(
  initialState,
  on(getPageTitleData, (state) => {
    return { ...state, loading: true, error: null };
  }),
  on(getPageTitleDataSuccess, (state,data) => {
    return { ...state,...data ,loading: true, error: null };
  }),
);

export function reducer(state: PageTitleState | undefined, action: Action) {
  return PageTitleReducer(state, action);
}
