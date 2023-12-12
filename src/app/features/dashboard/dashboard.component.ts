import {Component, OnInit, AfterViewInit} from '@angular/core';
import {UntypedFormBuilder, Validators, UntypedFormGroup} from '@angular/forms';
import {Store} from "@ngrx/store";
import {Observable, of} from "rxjs";
import {ConsumptionFromToObject, DateHelperService} from "./shared/utils/date-helper";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {AlertDetailsModalComponent} from "./shared/alert-details-modal/alert-details-modal.component";
import {VacationsModalComponent} from "./shared/vacations-modal/vacations-modal.component";
import {VacationModel, VacationsService} from "./shared/vacations-modal/vacations.service";
import {CardsService} from "../../shared/services/cards.service";
import {MeterService} from "../../shared/services/meter.service";
import {UserInfoService} from "../../shared/services/user-info.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  breadCrumbItems: Array<{}>;
  formData: UntypedFormGroup;

  // Form submit
  cardsData: any;
  metersData: any;
  activeTab = 0;
  uom: any;
  userInfo: any;
  private bsModalRef: BsModalRef<unknown>;
  currentMeter: any;
  vacationsData: VacationModel[] = null;
  modalRef: BsModalRef;

  constructor(public formBuilder: UntypedFormBuilder,
              private modalService: BsModalService,
              private cardsService: CardsService,
              private meterService: MeterService,
              private userInfoService: UserInfoService,
              private vacationService: VacationsService) {

  }

  /**
   * Returns form
   */
  get form() {
    return this.formData.controls;
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{label: 'Dashboards'}, {label: 'Saas', active: true}];
    this.getVacations();
    this.formData = this.formBuilder.group({
      message: ['', [Validators.required]],
    });
    this.cardsService.getCardsDataResult$.subscribe(data => {
      this.cardsData = data;
    });

    this.meterService.getMetersResult$.subscribe(data => {
      this.metersData = data;
    });

    this.userInfoService.getUserInfoResult$.subscribe(data => {
      this.userInfo = data;
    });
  }

  ngAfterViewInit() {
  }


  openAlertDetails(alert: any) {
    const initialState: ModalOptions = {
      initialState: {
        data: alert,
        meter: this.currentMeter
      }
    };
    this.bsModalRef = this.modalService.show(AlertDetailsModalComponent, initialState);
  }

  setVacations() {
    const dataToPass = {
      uom: this.uom,
      vacationsData: {
        ...this.vacationsData[this.vacationsData.length - 1],
        vacationID: this.vacationService.vacationID
      },
    }
    this.modalRef = this.modalService.show(VacationsModalComponent, {
      initialState: dataToPass,
      class: 'modal-lg'
    });

    this.modalRef.onHidden.subscribe(() => {
      this.getVacations();
    })
  }

  private getVacations() {
    this.vacationService.getConsumerVacations().subscribe((data: VacationModel[]) => {
      this.vacationsData = data;
      this.vacationService.vacationID = this.vacationsData[0].vacationID
    })
  }
}
