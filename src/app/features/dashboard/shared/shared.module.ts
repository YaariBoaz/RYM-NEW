import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { MonthlyConsumptionChartComponent } from './monthly-consumption-chart/monthly-consumption-chart.component';
import {NgxEchartsModule} from "ngx-echarts";
import {NgChartsModule} from "ng2-charts";
import { ComapreToPreviousYearChartComponent } from './comapre-to-previous-year-chart/comapre-to-previous-year-chart.component';
import { AlertDetailsModalComponent } from './alert-details-modal/alert-details-modal.component';
import { VacationsModalComponent } from './vacations-modal/vacations-modal.component';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import { MonthlyDailyChatWrapperComponent } from './monthly-daily-chat-wrapper/monthly-daily-chat-wrapper.component';
import { AlertsComponent } from './alerts/alerts.component';

@NgModule({
  declarations: [MonthlyConsumptionChartComponent, ComapreToPreviousYearChartComponent, AlertDetailsModalComponent, VacationsModalComponent, MonthlyDailyChatWrapperComponent, AlertsComponent],
    imports: [
        CommonModule,
        NgApexchartsModule,
        NgxEchartsModule.forChild(),
        NgChartsModule,
      BsDatepickerModule
    ],
    exports: [MonthlyConsumptionChartComponent, ComapreToPreviousYearChartComponent, MonthlyDailyChatWrapperComponent, MonthlyDailyChatWrapperComponent, AlertsComponent]
})
export class SharedModule { }
