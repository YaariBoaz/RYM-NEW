import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {
  selectConsumptionChartData,
  selectConsumptionMonths
} from "../../../../../store/consumption/consumption.selector";
import {Store} from "@ngrx/store";
import * as moment from 'moment';
import {EChartsOption} from "echarts";
import {monthlyConsumptionConfig} from "./config";

@Component({
  selector: 'app-monthly-consumption-chart',
  templateUrl: './monthly-consumption-chart.component.html',
  styleUrls: ['./monthly-consumption-chart.component.css']
})
export class MonthlyConsumptionChartComponent implements OnInit {
  monthlyConsumptionConfig = monthlyConsumptionConfig

  /*
    {
        name: 'Consumption at low rate',
        type: 'bar',
        data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2]
      },
      {
        name: 'Consumption at high rate',
        type: 'bar',
        data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2]
      },
  */
  private echartsInstance: any;

  constructor(private store: Store,private  cdr:ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.store.select(selectConsumptionChartData).subscribe(consumptionState => {
      this.echartsInstance?.setOption(monthlyConsumptionConfig);
    })
    this.store.select(selectConsumptionMonths).subscribe(months =>{
      debugger
    })
  }

  onChartInit(ec: any) {
    this.echartsInstance = ec;
  }
}
