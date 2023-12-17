import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable, of} from "rxjs";
import {BsModalService} from "ngx-bootstrap/modal";
import {AlertDetailsModalComponent} from "../alert-details-modal/alert-details-modal.component";
import {AlertModel, AlertsService} from "./alerts.service";

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  alerts:AlertModel[];

  constructor(private alertService: AlertsService, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.alertService.getAlertsResult$.subscribe((data:[]) => {
      this.alerts = data;
    });
  }


  openAlertDetails(alert: any) {
    const data = {...alert} as any;
    this.modalService.show(AlertDetailsModalComponent, {initialState: data});
  }
}
