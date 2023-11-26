import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';

import { SellingchartComponent } from './sellingchart/sellingchart.component';
import { MonthlyConsumptionChartComponent } from './monthly-consumption-chart/monthly-consumption-chart.component';
import {NgxEchartsModule} from "ngx-echarts";
import {NgChartsModule} from "ng2-charts";
import { ComapreToPreviousYearChartComponent } from './comapre-to-previous-year-chart/comapre-to-previous-year-chart.component';

@NgModule({
  declarations: [SellingchartComponent,MonthlyConsumptionChartComponent, ComapreToPreviousYearChartComponent],
    imports: [
        CommonModule,
        NgApexchartsModule,
        NgxEchartsModule.forChild(),
        NgChartsModule,
    ],
    exports: [SellingchartComponent, MonthlyConsumptionChartComponent, ComapreToPreviousYearChartComponent]
})
export class SharedModule { }
