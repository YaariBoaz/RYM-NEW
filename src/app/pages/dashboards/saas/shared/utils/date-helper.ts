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
    const start = moment().startOf('month')
    const months = this.generateMonthsSet(start, isForDatePicker);
    return {
      fromTo: {from: months[0], to: months[months.length - 1]},
      months: months
    }
  }

  generateMonthsSet(startDate: moment.Moment, isForDatePicker?: boolean): string[] {
    const startCopy = startDate.clone();
    const months: string[] = [];
    const today = startCopy.subtract(11, 'months').format('MM-DD-YYYY');
    const end = moment(today);
    while (end.isSameOrBefore(startDate, 'month')) {
      if (isForDatePicker) {
        months.push(startDate.format('MMM YYYY'))
      } else {
        months.push(startDate.format('MMM YYYY'))
      }
      startDate.subtract(1, 'month')
    }
    return months;
  }

  getMonthsSetFromNewMonth(date: number): ConsumptionFromToMonthlyObject {
    const momentDate = moment(date).startOf('month');
    const months = this.generateMonthsSet(momentDate);
    return {
      fromTo: {from: months[0], to: months[months.length - 1]},
      months: months
    }
  }

  getInitialDatesForPicker() {
    return this.initialDatesForChart(true)
  }

  getFromToDaily(from: number, to: number):ConsumptionFromToObject {
    const fromStr = moment(from).format('YYYY, MMM, DD');
    const toStr = moment(to).format('YYYY, MMM, DD');
    return {from: fromStr, to: toStr};
  }

  getInitialDatesForDailyPicker(): ConsumptionFromToObject {
    const today = moment().format('YYYY, MMM, DD');
    return {from: today, to: today};
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
