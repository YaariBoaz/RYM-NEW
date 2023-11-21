import {Component, OnInit, AfterViewInit} from '@angular/core';
import {UntypedFormBuilder, Validators, UntypedFormGroup} from '@angular/forms';
import {ChartType, ChatMessage} from './saas.model';
import {ConfigService} from '../../../core/services/config.service';
import {Store} from "@ngrx/store";
import {selectUserData} from "../../../shared/ui/pagetitle/page-title.selector";
import {Observable} from "rxjs";
import {PageTitleState} from "../../../shared/ui/pagetitle/page-title.reducer";
import {selectMetersData} from "../../../store/meters/meters.selector";
import {MeterData} from "../../../store/meters/meters.reducer";
import {fetchClientMetersData} from "../../../store/meters/meters.action";
import {selectCardsData} from "../../../store/cards/cards.selector";
import {CardsState} from "../../../store/cards/cards.reducer";
import {fetchCardsData} from "../../../store/cards/cards.action";
import {selectAlertsData} from "../../../store/alerts/alerts.selector";
import {AlertsData} from "../../../store/alerts/alerts.reducer";
import {fetchClientAlertsData} from "../../../store/alerts/alerts.action";
import {ConsumptionFromToMonthlyObject, ConsumptionFromToObject, DateHelperService} from "./shared/utils/date-helper";
import {BsDatepickerViewMode} from "ngx-bootstrap/datepicker";
import * as moment from "moment";
import {fetchLastBillingCycleData} from "../../../store/last-billing-cycle-chart/lastBillingCycleChart.action";


@Component({
  selector: 'app-saas',
  templateUrl: './saas.component.html',
  styleUrls: ['./saas.component.scss']
})
/**
 * Saas-dashboard component
 */
export class SaasComponent implements OnInit, AfterViewInit {


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

  constructor(public formBuilder: UntypedFormBuilder, private configService: ConfigService, private store: Store, private dateHelperService: DateHelperService) {
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

    this.configService.getConfig().subscribe(response => {
      this.sassEarning = response.sassEarning;
      this.sassTopSelling = response.sassTopSelling;

    });

    this.store.dispatch(fetchClientMetersData());
    const a: ConsumptionFromToMonthlyObject = this.dateHelperService.getMonthsSetFromNewMonth(this.range1.getTime(), this.range2.getTime());
    this.fromToMonthly = a;
    this.store.dispatch(fetchCardsData({from: a.fromTo.from, to: a.fromTo.to}));
    this.store.dispatch(fetchClientAlertsData());
    this.userData$ = this.store.select(selectUserData);
    this.metersData$ = this.store.select(selectMetersData);
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
    if (this.isMonthly) {
      this.range1 = event[0];
      this.range2 = event[1];
      this.store.dispatch(fetchCardsData({
        from: moment(this.range1).format('MMM-yyyy'),
        to: moment(this.range2).format('MMM-yyyy')
      }));
    } else {

    }
  }

  periodChange(isMonthly: boolean) {
    if (isMonthly) {
      this.dateRangeConfig.minMode = "month";
      this.dateRangeConfig.maxDateRange = 365;
    } else {

    }
    this.dateRangeConfig.minMode = "day";
    this.dateRangeConfig.maxDateRange = 30;
    if(!this.fromDailyValue || !this.toDailyValue){
      this.range1 = new Date();
      this.range2 = new Date();
    }
    //2023-10-27
    this.currentDateFormat = "YYYY , MMM , dd"
    this.store.dispatch(fetchLastBillingCycleData({from:moment(this.range1).format('YYYY-MM-D'),to:moment(this.range2).format('YYYY-MM-D')}))
  }
}
