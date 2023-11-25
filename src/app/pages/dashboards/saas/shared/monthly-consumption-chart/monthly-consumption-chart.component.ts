import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {
  selectConsumptionChartData,
  selectConsumptionMonths
} from "../../../../../store/consumption/consumption.selector";
import {Store} from "@ngrx/store";
import * as moment from 'moment';
import {EChartsOption} from "echarts";
import {dailyConsumptionConfig, monthlyConsumptionConfig} from "./config";
import {
  selectLastBillingCycleChartData
} from "../../../../../store/last-billing-cycle-chart/lastBillingCycleChart.selector";
import {ConsumptionFromToMonthlyObject} from "../utils/date-helper";
import {ChartConfiguration, LegendElement, LegendItem, TooltipItem} from "chart.js";
import firebase from "firebase/compat";
import Item = firebase.analytics.Item;

@Component({
  selector: 'app-monthly-consumption-chart',
  templateUrl: './monthly-consumption-chart.component.html',
  styleUrls: ['./monthly-consumption-chart.component.scss']
})
export class MonthlyConsumptionChartComponent implements OnInit,OnChanges {
  barChartData: any;
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {position: 'bottom', onClick: (e) => (e as any).stopPropagation()},
      tooltip:{
        callbacks:{
          label(tooltipItem: TooltipItem<'bar'>): string | string[] | void {
            const dataLabel =tooltipItem.formattedValue + ' ' + (tooltipItem.dataset as any).uom.unit;
            return  dataLabel;
          }
        }
      },
    },
    scales:{
      x:{
        ticks:{
          callback:(value, index, ticks)=>{
            return value;
          }
        }
      }
    }
  }
  public barChartOptionsDaily: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {position: 'bottom', onClick: (e) => (e as any).stopPropagation()},
      tooltip:{
        callbacks:{
          label(tooltipItem: TooltipItem<'bar'>): string | string[] | void {
            const dataLabel =tooltipItem.formattedValue + ' ' + (tooltipItem.dataset as any).uom.unit;
            return  dataLabel;
          }
        }
      },
    },
    scales:{
      x:{
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'DD', // This is the default
          },
        }
      }
    }
  }
  barChartPlugins = [];
  barChartLegend =true;

  constructor(private store: Store,private  cdr:ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.store.select(selectConsumptionChartData).subscribe(consumptionState => {
      if(monthlyConsumptionConfig.datasets && (monthlyConsumptionConfig.datasets as any).length>0){
       this.barChartData =monthlyConsumptionConfig
      }
    });
    this.store.select(selectLastBillingCycleChartData).subscribe(data=>{
      if(dailyConsumptionConfig.datasets && (dailyConsumptionConfig.datasets as any).length>0){
        this.barChartData =dailyConsumptionConfig;
        this.barChartOptions = this.barChartOptionsDaily;
      }
    })
  }



  ngOnChanges(changes: SimpleChanges): void {

  }




  private getDaysSetFromNewRange(from, to) {
    return undefined;
  }
}
