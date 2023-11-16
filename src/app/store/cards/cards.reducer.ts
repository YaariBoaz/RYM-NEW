import {Action, createReducer, on} from "@ngrx/store";
import {fetchCardsData, fetchCardsDataFail, fetchCardsDataSuccess} from "./cards.action";

export interface CardsData{
  currentMeterReading:number;
  currentMonthConsumption:number;
  endOfMonthForecast:number;
  uom:string;
  monthlyLowRate:number;
}
export interface CardsState{
  data:CardsData;
}
export const initialState: CardsState = { data: {
    currentMeterReading:0,
    currentMonthConsumption:0,
    endOfMonthForecast:0,
    uom:'',
    monthlyLowRate:0
}
}


export const CardsReducer = createReducer(initialState,
  on(fetchCardsData, (state) => {
    return { ...state, loading: true, error: null };
  }), on(fetchCardsDataSuccess, (state,  {data}) => {
    return { ...state, data, loading: false };
  }),
  on(fetchCardsDataFail, (state, { error }) => {
    return { ...state, error, loading: false };
  }));


export function reducer(state: CardsState | undefined, action: Action) {
  return CardsReducer(state, action);
}
