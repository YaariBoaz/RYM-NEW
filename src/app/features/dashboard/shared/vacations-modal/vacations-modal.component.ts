import {Component, OnInit} from '@angular/core';
import * as moment from "moment";
import {BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-vacations-modal',
  templateUrl: './vacations-modal.component.html',
  styleUrls: ['./vacations-modal.component.scss']
})
export class VacationsModalComponent implements OnInit {
  dateRangeConfig = {
    dateInputFormat: 'DD MMM YYYY',
    maxDateRange: 365,
    minMode: 'day'
  };
  dateRangePickerValue ?: (Date | undefined)[];
  range1;
  range2;
  uom;

  constructor(public modalService: BsModalService) {

  }

  ngOnInit(): void {
    this.setInitialDates()
  }

  onOpenCalendar($event: any) {

  }

  onDateValueChange($event: any) {
    console.log($event);
    this.range1 = $event[0];
    this.range2 = $event[1];
  }

  setInitialDates() {
    const today = moment();
    today.add('day', 1);
    this.range1 = today;
    this.range2 = today;
  }
}
