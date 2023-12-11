import {ChangeDetectorRef, Component, TemplateRef} from '@angular/core';
import {Store} from "@ngrx/store";
import {fetchSettingsData} from "../../../store/settings/settings.action";
import {selectSettingsData} from "../../../store/settings/settings.selector";
import {SettingsData} from "../../../store/settings/settings.reducer";
import {Observable} from "rxjs";
import {SearchCountryField, CountryISO} from 'ngx-intl-tel-input';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  alerts = [];
  userData$: Observable<any>;
  CountryISO = CountryISO;
  preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];
  SearchCountryField = SearchCountryField;
  separateDialCode = true;
  phoneForm = new FormGroup({
    phone: new FormControl('', [Validators.required])
  });
   modalRef: BsModalRef<{ phoneNumber: string }>;

  constructor(private store: Store, private crf: ChangeDetectorRef, private modalService: BsModalService) {
    this.store.dispatch(fetchSettingsData());
    this.store.select(selectSettingsData).subscribe((data: SettingsData) => {
      if (data.alertsForSettings && data.settings) {
        this.alerts = new Array<AlertSettingItem>();
        data.alertsForSettings.map((alertType, index) => {
          const {alertTypeId, alertTypeName} = alertType;
          const email = data.settings.some(type => +type.alertTypeId === +alertTypeId && +type.mediaTypeId === 3)
          const sms = data.settings.some(type => +type.alertTypeId === +alertTypeId && +type.mediaTypeId === 1)
          this.alerts.push({
            name: alertTypeName,
            statusEmail: email,
            statusSMS: sms,
            alertTypeId
          })
        })
      }
    });
   // this.userData$ = this.store.select(selectUserData);
  }

  editPhone(phoneNumber: string, template: TemplateRef<any>) {
    console.log(phoneNumber);
    this.phoneForm.controls['phone'].setValue(phoneNumber);
    this.modalRef = this.modalService.show(template, {
      initialState: {
        phoneNumber
      },
      class: 'modal-lg modal-dialog-centered'
    });
  }

}

export interface AlertSettingItem {
  name: String;
  statusEmail: boolean;
  statusSMS: boolean;
  alertTypeId: number;
}
