import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {BsModalService} from "ngx-bootstrap/modal";
import {AlertDetailsModalComponent} from "../alert-details-modal/alert-details-modal.component";

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {
  alerts$: Observable<any[]>;

  constructor(private store: Store,private modalService:BsModalService) {
  }

  ngOnInit(): void {

  }


  openAlertDetails(alert: any) {
    const data = {...alert} as any;
    this.modalService.show(AlertDetailsModalComponent,{initialState:data});
  }
}
