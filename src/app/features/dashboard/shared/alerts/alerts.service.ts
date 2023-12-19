import {Injectable} from '@angular/core';
import {ApiService} from "../../../../shared/api.service";
import {Observable, Subject} from "rxjs";
import {LoggerService} from "../../../../shared/services/logger.service";
import {monthlyConsumptionConfig} from "../monthly-consumption-chart/config";

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  private alerts: AlertModel[];
  getAlertsResult$ = new Subject();

  constructor(private apiService: ApiService) {

  }

  fetchAlerts() {
    this.apiService.getMyAlerts().subscribe((data: AlertModel[]) => {
      this.alerts = data;
      LoggerService.LOG('getMyAlerts', this.alerts);
      this.getAlertsResult$.next(this.alerts);
    })
  }

  get getAlerts() {
    return this.alerts;
  }

  confirmAlert(logId: string): Observable<any> {
    return this.apiService.postConfirmAlert(logId)
  }
}

export interface AlertModel {
  alertTime: Date;
  alertTypeId: string;
  alertTypeName: string;
  isRead: string;
  logId: string;
  meterCount: string;
  meterSn: string;
  notificationType: string;
}
