import {createAction, props} from "@ngrx/store";
import {ConsumptionState, MonthsSet} from "./consumption.reducer";
import {CardsData} from "../cards/cards.reducer";

export const fetchConsumptionData = createAction('[Data] fetch Consumption Data');
export const fetchConsumptionDataSuccess = createAction('[Data] fetch ClientMeters success');
export const updateMonthsConsumptionData = createAction('[Data] update months consumption data',props<{months:MonthsSet}>());
export const fetchConsumptionDataFail = createAction('[Data] fetch ClientMeters fail',props<{ error: string }>());
