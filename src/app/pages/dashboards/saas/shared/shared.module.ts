import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';

import { SellingchartComponent } from './sellingchart/sellingchart.component';
import { MonthlyConsumptionChartComponent } from './monthly-consumption-chart/monthly-consumption-chart.component';
import {NgxEchartsModule} from "ngx-echarts";

@NgModule({
  declarations: [SellingchartComponent,MonthlyConsumptionChartComponent],
  imports: [
    CommonModule,
    NgApexchartsModule,
    NgxEchartsModule.forChild(),
  ],
  exports: [SellingchartComponent,MonthlyConsumptionChartComponent]
})
export class SharedModule { }
