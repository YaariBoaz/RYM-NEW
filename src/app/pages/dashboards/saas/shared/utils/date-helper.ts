import * as moment from "moment";
import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {
  updateDailyConsumptionFromToData,
  updateMonthsConsumptionFromToData
} from "../../../../../store/consumption/consumption.action";

@Injectable({
  providedIn: 'root'
})
export class DateHelperService {
  constructor(private store: Store) {
  }

  initialDatesForChart(isForDatePicker?: boolean): ConsumptionFromToMonthlyObject {
    const start = moment().startOf('month');
    const end = start.subtract(1, 'year');
    const months = this.generateMonthsSet(start, end, isForDatePicker);
    return {
      fromTo: {from: moment(months[months.length - 1]).format('YYYY-MM'), to: moment(months[0]).format('YYYY-MM')},
      months: months
    }
  }

  generateMonthsSet(startDate: moment.Moment, endDate: moment.Moment, isForDatePicker?: boolean): string[] {
    const startCopy = startDate.clone();
    const months: string[] = [];
    if (startDate.diff(endDate, 'days') > 365) {
      endDate = startDate.add(1, 'year');
    }
    const end = moment(startDate);
    while (!end.isAfter(endDate, 'month')) {
      if (isForDatePicker) {
        months.push(endDate.format('MMM YYYY'))
      } else {
        months.push(endDate.format('MMM YYYY'))
      }
      endDate.subtract(1, 'month')
    }
    return months;
  }

  getMonthsSetFromNewMonth(from: number, to: number): ConsumptionFromToMonthlyObject {
    const momentFrom = moment(from).startOf('month');
    const momentTo = moment(to).startOf('month');
    const months = this.generateMonthsSet(momentFrom, momentTo, true);
    return {
      fromTo: {from: months[months.length - 1], to: months[0]},
      months: months
    }
  }


  getFromToDaily(from: number, to: number): ConsumptionFromToObject {
    const fromStr = moment(from).format('YYYY, MMM, DD');
    const toStr = moment(to).format('YYYY, MMM, DD');
    return {from: fromStr, to: toStr};
  }

  getInitialDatesForDailyPicker(): ConsumptionFromToObject {
    const today = moment().format('YYYY, MMM, DD');
    return {from: today, to: today};
  }

  dagetDaysSetFromNewRange(from, to): number[] {
    const fromMoment = moment(from).add();
    const toMoment = moment(to).add(1, 'day');
    const days = [];
    for (var m = moment(fromMoment); m.isBefore(toMoment); m.add(1, 'days')) {
      days.push(m.format('DD MMM YYYY'));
    }
    return days;
  }


}


export interface ConsumptionFromToObject {
  from: string,
  to: string,
}

export interface ConsumptionFromToMonthlyObject {
  fromTo: ConsumptionFromToObject
  months: string[]
}
