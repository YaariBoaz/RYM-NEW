import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {
  selectConsumptionChartData,
  selectConsumptionMonths
} from "../../../../../store/consumption/consumption.selector";
import {Store} from "@ngrx/store";
import * as moment from 'moment';
import {EChartsOption} from "echarts";
import {monthlyConsumptionConfig} from "./config";
import {
  selectLastBillingCycleChartData
} from "../../../../../store/last-billing-cycle-chart/lastBillingCycleChart.selector";
import {ConsumptionFromToMonthlyObject} from "../utils/date-helper";

@Component({
  selector: 'app-monthly-consumption-chart',
  templateUrl: './monthly-consumption-chart.component.html',
  styleUrls: ['./monthly-consumption-chart.component.css']
})
export class MonthlyConsumptionChartComponent implements OnInit,OnChanges {
  @Input() months:string[];
  monthlyConsumptionConfig = monthlyConsumptionConfig
  private echartsInstance: any;

  constructor(private store: Store,private  cdr:ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.store.select(selectConsumptionChartData).subscribe(consumptionState => {
      if(monthlyConsumptionConfig.series && (monthlyConsumptionConfig.series as any).length>0){
        this.echartsInstance?.setOption(monthlyConsumptionConfig);
      }
    });
    this.store.select(selectLastBillingCycleChartData).subscribe(data=>{
      if(monthlyConsumptionConfig.series && (monthlyConsumptionConfig.series as any).length>0){
        this.echartsInstance?.setOption(monthlyConsumptionConfig);
      }
    })
  }

  onChartInit(ec: any) {
    this.echartsInstance = ec;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes && changes.months && changes.months.currentValue){
      this.months = changes.months.currentValue;
      (monthlyConsumptionConfig.xAxis as any)[0].data = this.months.reverse();
      this.echartsInstance?.setOption(monthlyConsumptionConfig);
    }
  }




  private getDaysSetFromNewRange(from, to) {
    return undefined;
  }
}
