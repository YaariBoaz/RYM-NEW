import {createAction, props} from "@ngrx/store";
import {ConsumptionData, ConsumptionState, FromToSet, MonthsSet} from "./consumption.reducer";

export const fetchConsumptionData = createAction('[Data] fetch Consumption Data');
export const fetchConsumptionChartData = createAction('[Data] fetch Consumption Chart Data', props <{from: string, to: string}>());
export const fetchConsumptionChartDataSuccess = createAction('[Data] fetch Consumption Chart Data SUCCESS', props<{ data: ConsumptionState }>());
export const fetchConsumptionChartDataFail = createAction('[Data] fetch Consumption Chart Data FAIL', props<{ error: string }>());
export const fetchConsumptionDataSuccess = createAction('[Data] fetch ClientMeters success');
export const updateMonthsConsumptionData = createAction('[Data] update months consumption data', props<{ months: MonthsSet }>());
export const updateMonthsConsumptionFromToData = createAction('[Data] update months consumption from and to MONTHLY data', props<{ fromToMonths: FromToSet }>());
export const updateDailyConsumptionFromToData = createAction('[Data] update months consumption from and to DAILY data', props<{ fromToDaily: FromToSet }>());
export const getMonthsConsumptionFromToData = createAction('[Data] update months consumption from and to  data');
export const fetchConsumptionDataFail = createAction('[Data] fetch ClientMeters fail', props<{ error: string }>());
