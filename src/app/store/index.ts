import {ActionReducerMap} from "@ngrx/store";
import {LayoutState, layoutReducer} from "./layouts/layouts.reducer";
import {CustomerReducer, CustomerState} from "./customer/customer.reducer";
import {PageTitleReducer, PageTitleState} from "../shared/ui/pagetitle/page-title.reducer";
import {ClientMeterReducer, ClientMeterState} from "./meters/meters.reducer";
import {CardsReducer, CardsState} from "./cards/cards.reducer";
import {AlertsReducer, AlertsState} from "./alerts/alerts.reducer";
import {ConsumptionReducer, ConsumptionState} from "./consumption/consumption.reducer";
import {
  LastBillingCycleChartState,
  LastBillingCycleChartStateReducer
} from "./last-billing-cycle-chart/lastBillingCycleChart.reducer";
import {
  CompareToPreviousYearChartReducer,
  CompareToPreviousYearChartState
} from "./comapre-to-previous-year-chart/comapre-to-previous-year-chart.reducer";
import {VacationReducer, VacationsModelState} from "./vacations/vacations.reducer";


export interface RootReducerState {
  layout: LayoutState;
  Customer: CustomerState;
  pageTitle: PageTitleState
  clientMeters: ClientMeterState
  cardsState: CardsState
  alertsState: AlertsState
  consumptionState: ConsumptionState
  lastBillingCycleChartState: LastBillingCycleChartState,
  compareToPreviousYearChartState: CompareToPreviousYearChartState,
  vacationsModelState: VacationsModelState
}

export const rootReducer: ActionReducerMap<RootReducerState> = {
  layout: layoutReducer,
  cardsState: CardsReducer,
  Customer: CustomerReducer,
  pageTitle: PageTitleReducer,
  clientMeters: ClientMeterReducer,
  alertsState: AlertsReducer,
  consumptionState: ConsumptionReducer,
  lastBillingCycleChartState: LastBillingCycleChartStateReducer,
  compareToPreviousYearChartState: CompareToPreviousYearChartReducer,
  vacationsModelState: VacationReducer

}
