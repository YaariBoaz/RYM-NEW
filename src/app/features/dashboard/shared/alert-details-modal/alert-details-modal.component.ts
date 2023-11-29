import { Component } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-alert-details-modal',
  templateUrl: './alert-details-modal.component.html',
  styleUrls: ['./alert-details-modal.component.scss']
})
export class AlertDetailsModalComponent {
  data: any;
  meter: any;
constructor(public bsModalRef: BsModalRef) {
}
}
