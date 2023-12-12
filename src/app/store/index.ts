import {ActionReducerMap} from "@ngrx/store";
import {LayoutState, layoutReducer} from "./layouts/layouts.reducer";
import {CustomerReducer, CustomerState} from "./customer/customer.reducer";
import {
  LastBillingCycleChartState,
  LastBillingCycleChartStateReducer
} from "./last-billing-cycle-chart/lastBillingCycleChart.reducer";
import {
  CompareToPreviousYearChartReducer,
  CompareToPreviousYearChartState
} from "./comapre-to-previous-year-chart/comapre-to-previous-year-chart.reducer";
import {SettingsReducer, SettingsState} from "./settings/settings.reducer";
import {ContactUsDetailsState, ContactUsReducer} from "./contact-us/contact-us.reducer";


export interface RootReducerState {
  layout: LayoutState;
  Customer: CustomerState;
  lastBillingCycleChartState: LastBillingCycleChartState,
  compareToPreviousYearChartState: CompareToPreviousYearChartState,
  settingsState: SettingsState
  contactUsDetailsState: ContactUsDetailsState
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  layout: layoutReducer,
  Customer: CustomerReducer,
  lastBillingCycleChartState: LastBillingCycleChartStateReducer,
  compareToPreviousYearChartState: CompareToPreviousYearChartReducer,
  settingsState: SettingsReducer,
  contactUsDetailsState: ContactUsReducer

}
