import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import {NgxIntlTelInputModule} from "ngx-intl-tel-input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
    CommonModule,
    NgxIntlTelInputModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[SettingsComponent]
})
export class SettingsModule { }

