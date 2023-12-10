import {Component, OnInit} from '@angular/core';
import * as moment from "moment";
import {BsModalService} from "ngx-bootstrap/modal";
import {Store} from "@ngrx/store";
import {postVacations, postVacationsSuccess} from "../../../../store/vacations/vacations.action";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {selectAlertsData} from "../../../../store/vacations/vacations.selector";

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
  vacationForm = new FormGroup({
    limit: new FormControl('', [Validators.required])
  })
  vacationId = 0;

  constructor(public modalService: BsModalService, private store: Store) {

  }

  ngOnInit(): void {
    this.setInitialDates()
    this.store.select(selectAlertsData).subscribe(data => {
      if (data && data.data) {
        debugger
        this.vacationId = data;
      }
    })
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

  onSubmit() {
    console.log('SUBMIT')
    this.store.dispatch(postVacations({
      vacationID: this.vacationId,
      consumptionDailyLimit: this.vacationForm.get('limit').value,
      endDate: moment(this.range2).format(),
      startDate: moment(this.range1).format()
    }))
  }
}
