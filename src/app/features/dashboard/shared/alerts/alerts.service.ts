import { Injectable } from '@angular/core';
import {ApiService} from "../../../../shared/api.service";

@Injectable({
  providedIn: 'root'
})
export class AlertsService {
  private alerts: Object;

  constructor(private apiService:ApiService) {
    this.fetchAlerts();
  }

  fetchAlerts(){
    this.apiService.getMyAlerts().subscribe(data =>{
      this.alerts = data;
    })
  }

  get getAlerts() {
    return this.alerts;
  }
}
