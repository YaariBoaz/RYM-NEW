import {Injectable} from '@angular/core';
import {ApiService} from "../../../../shared/api.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  private alerts: Object;
  getAlertsResult$ = new Subject();

  constructor(private apiService: ApiService) {
    this.fetchAlerts();
  }

  fetchAlerts() {
    this.apiService.getMyAlerts().subscribe(data => {
      this.alerts = data;
      this.getAlertsResult$.next(this.alerts);
    })
  }

  get getAlerts() {
    return this.alerts;
  }
}
