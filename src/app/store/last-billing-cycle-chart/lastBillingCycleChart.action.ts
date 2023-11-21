import {createAction, props} from "@ngrx/store";
import {LastBillingCycleChartState} from "./lastBillingCycleChart.reducer";

export const fetchLastBillingCycleData = createAction('[Data] Last Billing Cycle Data', props<{from:string,to:string}>());
export const fetchLastBillingCycleDataSuccess = createAction('[Data] Last Billing Cycle Data success', props<LastBillingCycleChartState>());
export const fetchLastBillingCycleFail = createAction('[Data] Last Billing Cycle Datas fail',props<{ error: string }>());

