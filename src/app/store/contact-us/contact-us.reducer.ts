import {Action, createReducer, on} from "@ngrx/store";
import {fetchContactUsData, fetchContactUsDataFail, fetchContactUsDataSuccess} from "./contact-us.action";

export interface ContactUsDetails {
  phoneNumber: string
  description: string;
  municipalID: number;
  Email: string;
}

export interface ContactUsDetailsState {
  data: ContactUsDetails;
}

export const initialState: ContactUsDetailsState = {data: null};


export const ContactUsReducer = createReducer(initialState,
  on(fetchContactUsData, (state) => {
    return { ...state, loading: true, error: null };
  }), on(fetchContactUsDataSuccess, (state,  {data}) => {
    return { ...state, data, loading: false };
  }),
  on(fetchContactUsDataFail, (state, { error }) => {
    return { ...state, error, loading: false };
  }));


export function reducer(state: ContactUsDetailsState | undefined, action: Action) {
  return ContactUsReducer(state, action);
}
