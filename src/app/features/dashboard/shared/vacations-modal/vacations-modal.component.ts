import {Component, Input, OnInit} from '@angular/core';
import * as moment from "moment";
import {BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {VacationModel, VacationsService} from "./vacations.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-vacations-modal',
  templateUrl: './vacations-modal.component.html',
  styleUrls: ['./vacations-modal.component.scss']
})
export class VacationsModalComponent implements OnInit {
  vacationsData: VacationModel;
  dateRangeConfig = {
    dateInputFormat: 'DD MMM YYYY',
    maxDateRange: 365,
    minMode: 'day'
  };
  dateRangePickerValue ?: (Date | undefined)[];
  range1: moment.MomentInput;
  range2: moment.MomentInput;
  uom: any;
  vacationForm = new FormGroup({
    limit: new FormControl('', [Validators.required])
  })
  vacationId = 0;

  constructor(public modalService: BsModalService, public options: ModalOptions, private vacationService: VacationsService) {

  }

  ngOnInit(): void {
    this.vacationsData = this.options.initialState.vacationsData as VacationModel;
    this.range1 = this.vacationsData.startDate;
    this.range2 = this.vacationsData.endDate;
    this.vacationForm.get('limit').setValue(this.vacationsData.consumptionDailyLimit);
    if(!this.range2 && !this.range1){
      this.setInitialDates()
    }
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
    this.vacationService.postVacations({
      vacationID: this.vacationsData.vacationID,
      consumptionDailyLimit: this.vacationForm.get('limit').value,
      endDate: moment(this.range2).format(),
      startDate: moment(this.range1).format()
    }).subscribe(data => {
      this.vacationService.vacationID = data.newVacationId;
      this.modalService.hide();
    })
  }
}
