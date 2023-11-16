import {createFeatureSelector, createSelector} from "@ngrx/store";
import {CardsState} from "./cards.reducer";

export const selectCardsDataState = createFeatureSelector<CardsState>('cardsState');


export const selectCardsData = createSelector(
  selectCardsDataState,
  (state: CardsState) => state
);
