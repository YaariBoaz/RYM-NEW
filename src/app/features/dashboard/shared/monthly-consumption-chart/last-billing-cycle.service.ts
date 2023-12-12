import {Injectable} from '@angular/core';
import {ApiService} from "../../../../shared/api.service";
import {dailyConsumptionConfig} from "./config";
import {DateHelperService} from "../utils/date-helper";
import {BehaviorSubject} from "rxjs";
import {LoggerService} from "../../../../shared/services/logger.service";

@Injectable({
  providedIn: 'root'
})
export class LastBillingCycleService {
  lastBillingCycle;
  getLastBullingCycleResult$ = new BehaviorSubject(null);

  constructor(private apiService: ApiService, private dateHelper: DateHelperService) {
  }

  getConsumptionLastBillingCycleBetweenDates(from: string, to: string) {
    this.apiService.getConsumptionLastBillingCycleBetweenDates(from, to).subscribe(data => {
      this.prepareDataForCharts(data, from, to);
      this.lastBillingCycle = data;
      this.getLastBullingCycleResult$.next(this.lastBillingCycle);
      LoggerService.LOG('getConsumptionLastBillingCycleBetweenDates', this.lastBillingCycle);
    })
  }

  private prepareDataForCharts(data, from, to) {

    const real: any[] = [];
    const estimate: any[] = [];
    const days: number[] = this.dateHelper.dagetDaysSetFromNewRange(from, to);
    const dataTemp = []
    data.map((item, index) => {
      if (item.estimationType === 0) {
        real.push({
          x: new Date(days[index]),
          y: (Math.round((item.cons + Number.EPSILON) * 100) / 100),

        })
      } else {
        estimate.push({
          x: new Date(days[index]),
          y: (Math.round((item.cons + Number.EPSILON) * 100) / 100),

        })
      }
    })
    dailyConsumptionConfig.datasets = [];
    dailyConsumptionConfig.datasets.push({
      data: real,
      label: 'Real',
      backgroundColor: '#1cd3d2'
    });
    dailyConsumptionConfig.datasets.push({
      data: estimate,
      label: 'Estimate',
      backgroundColor: '#3daefa'
    });
    dailyConsumptionConfig.labels = days;
  }

}
