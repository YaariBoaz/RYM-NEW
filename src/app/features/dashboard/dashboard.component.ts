import {Component, OnInit, AfterViewInit} from '@angular/core';
import {UntypedFormBuilder, Validators, UntypedFormGroup} from '@angular/forms';
import {Store} from "@ngrx/store";
import {Observable, of} from "rxjs";
import {ConsumptionFromToMonthlyObject, ConsumptionFromToObject, DateHelperService} from "./shared/utils/date-helper";
import {BsDatepickerViewMode} from "ngx-bootstrap/datepicker";
import * as moment from "moment";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {AlertDetailsModalComponent} from "./shared/alert-details-modal/alert-details-modal.component";
import {VacationsModalComponent} from "./shared/vacations-modal/vacations-modal.component";
import {ChartType} from "chart.js";
import {ChatMessage} from "./dashboard.model";
import {PageTitleState} from "../../shared/ui/pagetitle/page-title.reducer";
import {MeterData} from "../../store/meters/meters.reducer";
import {CardsState} from "../../store/cards/cards.reducer";
import {AlertsData} from "../../store/alerts/alerts.reducer";
import {fetchClientMetersData} from "../../store/meters/meters.action";
import {fetchCardsData} from "../../store/cards/cards.action";
import {fetchClientAlertsData} from "../../store/alerts/alerts.action";
import {selectUserData, selectUserName} from "../../shared/ui/pagetitle/page-title.selector";
import {selectMetersData} from "../../store/meters/meters.selector";
import {selectCardsData} from "../../store/cards/cards.selector";
import {selectAlertsData} from "../../store/alerts/alerts.selector";
import {fetchLastBillingCycleData} from "../../store/last-billing-cycle-chart/lastBillingCycleChart.action";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {


  // bread crumb items
  breadCrumbItems: Array<{}>;

  earningLineChart: ChartType;
  salesAnalyticsDonutChart: ChartType;
  ChatData: ChatMessage[];

  sassEarning: any;
  sassTopSelling: any;

  formData: UntypedFormGroup;

  // Form submit
  chatSubmit: boolean;
  userData$: Observable<PageTitleState>;
  metersData$: Observable<MeterData[]>;
  cardsData$: Observable<CardsState>;
  activeTab = 0;
  alerts$: Observable<AlertsData[]>;
  isMonthly = true;
  fromToMonthly: ConsumptionFromToMonthlyObject;
  fromToDaily: ConsumptionFromToObject;
  minMode: BsDatepickerViewMode = 'month';
  months: string[];
  fromTo$: Observable<{ from: string; to: string }>;
  dateRangeConfig = {
    dateInputFormat: 'MM/YYYY',
    maxDateRange: 365,
    minMode: this.minMode
  };
  dateRangePickerValue ?: (Date | undefined)[];
  range1: Date;
  range2: Date;
  currentDateFormat = "MMM , yyyy";
  fromMonthValue;
  toMonthValue;
  fromDailyValue;
  toDailyValue;
  userInfo$: Observable<{ firstName: string; lastName: string }>;
  private bsModalRef: BsModalRef<unknown>;
  currentMeter: any;

  constructor(public formBuilder: UntypedFormBuilder,private modalService: BsModalService, private store: Store, private dateHelperService: DateHelperService) {
    this.range1 = new Date();
    this.range2 = new Date();
    this.range1.setFullYear(this.range1.getFullYear() - 1);
    this.fromMonthValue = this.range1;
    this.toMonthValue = this.range2;
  }

  /**
   * Returns form
   */
  get form() {
    return this.formData.controls;
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{label: 'Dashboards'}, {label: 'Saas', active: true}];
    this.dateRangePickerValue = [this.range1, this.range2];

    this.formData = this.formBuilder.group({
      message: ['', [Validators.required]],
    });



    this.store.dispatch(fetchClientMetersData());
    const a: ConsumptionFromToMonthlyObject = this.dateHelperService.getMonthsSetFromNewMonth(this.range1.getTime(), this.range2.getTime());
    this.fromToMonthly = a;
    this.store.dispatch(fetchCardsData({from: a.fromTo.from, to: a.fromTo.to}));
    this.store.dispatch(fetchClientAlertsData());
    this.userData$ = this.store.select(selectUserData);
    this.userInfo$ = this.store.select(selectUserName);
    this.store.select(selectMetersData).subscribe(data => {
      if (data && data.meters && data.meters.length) {
        this.metersData$ = of(data.meters);
        this.currentMeter = (data.meters[0] as any)
      }
    });
    this.cardsData$ = this.store.select(selectCardsData);
    this.alerts$ = this.store.select(selectAlertsData);


  }

  ngAfterViewInit() {
  }


  onOpenCalendar(container) {
    if (this.isMonthly) {
      this.dateRangeConfig.minMode = "month";
      this.dateRangeConfig.maxDateRange = 365;
    } else {
      this.dateRangeConfig.minMode = "day";
      this.dateRangeConfig.maxDateRange = 30;
    }
  }


  onDateValueChange(event) {
    this.range1 = event[0];
    this.range2 = event[1];
    if (this.isMonthly) {
      this.fromMonthValue = moment(this.range1).format('MMM-yyyy');
      this.toMonthValue = moment(this.range2).format('MMM-yyyy');
      this.currentDateFormat = "YYYY , MMM"
      this.store.dispatch(fetchCardsData({
        from: this.fromMonthValue,
        to: this.toMonthValue
      }));
    } else {
      this.fromDailyValue = this.range1;
      this.toDailyValue = this.range2;
      this.currentDateFormat = "YYYY , MMM , dd"
      this.store.dispatch(fetchLastBillingCycleData({
        from: moment(this.range1).format('YYYY-MM-D'),
        to: moment(this.range2).format('YYYY-MM-D')
      }))
    }
  }

  periodChange(isMonthly: boolean) {
    if (isMonthly) {
      this.dateRangeConfig.minMode = "month";
      this.dateRangeConfig.maxDateRange = 365;
      this.store.dispatch(fetchCardsData({from: this.fromMonthValue, to: this.toMonthValue}));
    } else {
      this.dateRangeConfig.minMode = "day";
      this.dateRangeConfig.maxDateRange = 30;
      if (!this.fromDailyValue || !this.toDailyValue) {
        this.setInitialDailyDate();
      }
      this.currentDateFormat = "YYYY , MMM , dd"
      this.store.dispatch(fetchLastBillingCycleData({
        from: this.fromDailyValue,
        to: this.toDailyValue
      }))
    }

  }

  private setInitialDailyDate() {
    const from = moment(new Date());
    from.subtract(1, 'month');
    const fromStr = from.format('YYYY-MM-D');
    const toStr = moment(new Date()).format('YYYY-MM-D');
    this.range1 = new Date(fromStr);
    this.range2 = new Date(toStr);
    this.fromDailyValue = moment(this.range1).format('YYYY-MM-D');
    this.toDailyValue = moment(this.range2).format('YYYY-MM-D')
  }

  openAlertDetails(alert: AlertsData) {
    const initialState: ModalOptions = {
      initialState: {
        data:alert,
        meter:this.currentMeter
      }
    };
    this.bsModalRef = this.modalService.show(AlertDetailsModalComponent, initialState);
  }

  setVacations() {
    this.modalService.show(VacationsModalComponent);
  }
}
