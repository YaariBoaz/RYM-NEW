import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardsRoutingModule } from './dashboards-routing.module';
import { UIModule } from '../../shared/ui/ui.module';
import { WidgetModule } from '../../shared/widget/widget.module';

import { NgApexchartsModule } from 'ng-apexcharts';
import { SharedModule } from './shared/shared.module'
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule,BsDropdownConfig} from 'ngx-bootstrap/dropdown';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SimplebarAngularModule } from 'simplebar-angular';
import {NgxEchartsModule} from "ngx-echarts";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {NgToggleModule} from "ngx-toggle-button";
import {DashboardComponent} from "./dashboard.component";
import {
  MonthlyDailyChatWrapperComponent
} from "./shared/monthly-daily-chat-wrapper/monthly-daily-chat-wrapper.component";

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardsRoutingModule,
    UIModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    TabsModule.forRoot(),
    CarouselModule.forRoot(),
    WidgetModule,
    NgApexchartsModule,
    SharedModule,
    SimplebarAngularModule,
    ModalModule.forRoot(),
    NgxEchartsModule,
    BsDatepickerModule,
    NgToggleModule
  ],
  providers: [BsDropdownConfig],
})
export class DashboardsModule { }
