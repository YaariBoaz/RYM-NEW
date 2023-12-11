import {Component, OnInit} from '@angular/core';
import {selectAlertsData} from "../../../../store/alerts/alerts.selector";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {AlertsData} from "../../../../store/alerts/alerts.reducer";

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  alerts$: Observable<AlertsData[]>;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.alerts$ = this.store.select(selectAlertsData);
  }


  openAlertDetails(alert: AlertsData) {

  }
}
