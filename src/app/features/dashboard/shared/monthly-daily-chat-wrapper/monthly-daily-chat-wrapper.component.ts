import {Component, OnInit} from '@angular/core';
import {BsDatepickerViewMode} from "ngx-bootstrap/datepicker";
import * as moment from "moment/moment";
import {fetchLastBillingCycleData} from "../../../../store/last-billing-cycle-chart/lastBillingCycleChart.action";
import {Store} from "@ngrx/store";
import {ConsumptionFromToMonthlyObject, DateHelperService} from "../utils/date-helper";

@Component({
  selector: 'app-monthly-daily-chat-wrapper',
  templateUrl: './monthly-daily-chat-wrapper.component.html',
  styleUrls: ['./monthly-daily-chat-wrapper.component.scss']
})
export class MonthlyDailyChatWrapperComponent implements OnInit {
  minMode: BsDatepickerViewMode = 'month';
  dateRangeConfig = {
    dateInputFormat: 'MM/YYYY',
    maxDateRange: 365,
    minMode: this.minMode
  };
  dateRangePickerValue ?: (Date | undefined)[];

  isMonthly = true;
  range1: Date;
  range2: Date;
  currentDateFormat = "MMM , yyyy";
  fromMonthValue;
  toMonthValue;
  fromDailyValue;
  toDailyValue;
  fromToMonthly: ConsumptionFromToMonthlyObject;

  constructor(private store: Store, private dateHelperService: DateHelperService) {
    this.range1 = new Date();
    this.range2 = new Date();
    this.range1.setFullYear(this.range1.getFullYear() - 1);
    this.fromMonthValue = this.range1;
    this.toMonthValue = this.range2;
  }

  ngOnInit(): void {
    this.dateRangePickerValue = [this.range1, this.range2];
    const a: ConsumptionFromToMonthlyObject = this.dateHelperService.getMonthsSetFromNewMonth(this.range1.getTime(), this.range2.getTime());
    this.fromToMonthly = a;
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
        // this.store.dispatch(fetchCardsData({
        //   from: this.fromMonthValue,
        //   to: this.toMonthValue
        // }));
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
      // this.store.dispatch(fetchCardsData({from: this.fromMonthValue, to: this.toMonthValue}));
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


}
