import { Action, createReducer, on } from '@ngrx/store';


export interface MailState {
    maildata: any[];
    loading: boolean;
    error: any;

}

export const initialState: MailState = {
    maildata: [],
    loading: false,
    error: null,

};

export const MailReducer = createReducer(
    initialState,
    // on(getPageTitleData, (state) => {
    //     return { ...state, loading: true, error: null };
    // }),
    // on(fetchmailSuccess, (state, { maildata }) => {
    //     return { ...state, maildata, loading: false };
    // }),
    // on(fetchmailFail, (state, { error }) => {
    //     return { ...state, error, loading: false };
    // }),

);

// Selector
export function reducer(state: MailState | undefined, action: Action) {
    return MailReducer(state, action);
}
