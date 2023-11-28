import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';

import { SellingchartComponent } from './sellingchart/sellingchart.component';
import { MonthlyConsumptionChartComponent } from './monthly-consumption-chart/monthly-consumption-chart.component';
import {NgxEchartsModule} from "ngx-echarts";
import {NgChartsModule} from "ng2-charts";
import { ComapreToPreviousYearChartComponent } from './comapre-to-previous-year-chart/comapre-to-previous-year-chart.component';
import { AlertDetailsModalComponent } from './alert-details-modal/alert-details-modal.component';
import { VacationsModalComponent } from './vacations-modal/vacations-modal.component';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";

@NgModule({
  declarations: [SellingchartComponent,MonthlyConsumptionChartComponent, ComapreToPreviousYearChartComponent, AlertDetailsModalComponent, VacationsModalComponent],
    imports: [
        CommonModule,
        NgApexchartsModule,
        NgxEchartsModule.forChild(),
        NgChartsModule,
      BsDatepickerModule
    ],
    exports: [SellingchartComponent, MonthlyConsumptionChartComponent, ComapreToPreviousYearChartComponent]
})
export class SharedModule { }
