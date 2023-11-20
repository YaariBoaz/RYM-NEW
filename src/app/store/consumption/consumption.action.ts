import {createAction, props} from "@ngrx/store";
import {ConsumptionState, FromToSet, MonthsSet} from "./consumption.reducer";
import {CardsData} from "../cards/cards.reducer";

export const fetchConsumptionData = createAction('[Data] fetch Consumption Data');
export const fetchConsumptionDataSuccess = createAction('[Data] fetch ClientMeters success');
export const updateMonthsConsumptionData = createAction('[Data] update months consumption data',props<{months:MonthsSet}>());
export const updateMonthsConsumptionFromToData = createAction('[Data] update months consumption from and to MONTHLY data',props<{fromToMonths:FromToSet}>());
export const updateDailyConsumptionFromToData = createAction('[Data] update months consumption from and to DAILY data',props<{fromToDaily:FromToSet}>());
export const getMonthsConsumptionFromToData = createAction('[Data] update months consumption from and to  data');
export const fetchConsumptionDataFail = createAction('[Data] fetch ClientMeters fail',props<{ error: string }>());
