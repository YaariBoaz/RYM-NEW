import {Component} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {MeterService} from "../../../../shared/services/meter.service";
import {UserInfoService} from "../../../../shared/services/user-info.service";
import {AlertModel, AlertsService} from "../alerts/alerts.service";

@Component({
  selector: 'app-alert-details-modal',
  templateUrl: './alert-details-modal.component.html',
  styleUrls: ['./alert-details-modal.component.scss']
})
export class AlertDetailsModalComponent {
  data: AlertModel;
  meter: any;

  constructor(public bsModalRef: BsModalRef, public meterService: MeterService, private alertService: AlertsService) {
  }

  onConfirmAlert() {
    this.alertService.confirmAlert(this.data.logId);
  }
}
