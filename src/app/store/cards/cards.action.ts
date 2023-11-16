import {createAction, props} from "@ngrx/store";
import {CardsData} from "./cards.reducer";

export const fetchCardsData = createAction('[Data] fetch CardsData');
export const fetchCardsDataSuccess = createAction('[Data] fetch CardsData success', props<{data:CardsData}>());
export const fetchCardsDataFail = createAction('[Data] fetch CardsData fail',props<{ error: string }>());
