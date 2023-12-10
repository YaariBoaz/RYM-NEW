import {Component, OnInit, AfterViewInit} from '@angular/core';
import {UntypedFormBuilder, Validators, UntypedFormGroup} from '@angular/forms';
import {Store} from "@ngrx/store";
import {Observable, of} from "rxjs";
import {ConsumptionFromToObject, DateHelperService} from "./shared/utils/date-helper";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {AlertDetailsModalComponent} from "./shared/alert-details-modal/alert-details-modal.component";
import {VacationsModalComponent} from "./shared/vacations-modal/vacations-modal.component";
import {ChartType} from "chart.js";
import {ChatMessage} from "./dashboard.model";
import {PageTitleState} from "../../shared/ui/pagetitle/page-title.reducer";
import {MeterData} from "../../store/meters/meters.reducer";
import {CardsState, UOM} from "../../store/cards/cards.reducer";
import {AlertsData} from "../../store/alerts/alerts.reducer";
import {fetchClientMetersData} from "../../store/meters/meters.action";
import {fetchClientAlertsData} from "../../store/alerts/alerts.action";
import {selectUserData, selectUserName} from "../../shared/ui/pagetitle/page-title.selector";
import {selectMetersData} from "../../store/meters/meters.selector";
import {selectCardsData} from "../../store/cards/cards.selector";
import {selectAlertsData} from "../../store/alerts/alerts.selector";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  breadCrumbItems: Array<{}>;
  formData: UntypedFormGroup;

  // Form submit
  userData$: Observable<PageTitleState>;
  metersData$: Observable<MeterData[]>;
  cardsData$: Observable<CardsState>;
  activeTab = 0;
  alerts$: Observable<AlertsData[]>;
  uom: UOM;
  userInfo$: Observable<{ firstName: string; lastName: string }>;
  private bsModalRef: BsModalRef<unknown>;
  currentMeter: any;

  constructor(public formBuilder: UntypedFormBuilder, private modalService: BsModalService, private store: Store, private dateHelperService: DateHelperService) {

  }

  /**
   * Returns form
   */
  get form() {
    return this.formData.controls;
  }

  ngOnInit(): void {
    this.breadCrumbItems = [{label: 'Dashboards'}, {label: 'Saas', active: true}];


    this.formData = this.formBuilder.group({
      message: ['', [Validators.required]],
    });


    this.store.dispatch(fetchClientMetersData());

    this.store.dispatch(fetchClientAlertsData());
    this.userData$ = this.store.select(selectUserData);
    this.userInfo$ = this.store.select(selectUserName);
    this.store.select(selectMetersData).subscribe(data => {
      if (data && data.meters && data.meters.length) {
        this.metersData$ = of(data.meters);
        this.currentMeter = (data.meters[0] as any)
      }
    });
    this.cardsData$ = this.store.select(selectCardsData);
    this.cardsData$.subscribe(data => {
      this.uom = data.data.uom
    })
    this.alerts$ = this.store.select(selectAlertsData);


  }

  ngAfterViewInit() {
  }


  openAlertDetails(alert: AlertsData) {
    const initialState: ModalOptions = {
      initialState: {
        data: alert,
        meter: this.currentMeter
      }
    };
    this.bsModalRef = this.modalService.show(AlertDetailsModalComponent, initialState);
  }

  setVacations() {
    const dataToPass ={
      uom: this.uom
    }
    this.modalService.show(VacationsModalComponent, {
      initialState:dataToPass,
      class: 'modal-lg'
    });
  }
}
