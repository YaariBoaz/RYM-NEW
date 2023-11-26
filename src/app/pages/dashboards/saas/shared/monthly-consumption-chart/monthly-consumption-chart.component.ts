import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {selectConsumptionChartData} from "../../../../../store/consumption/consumption.selector";
import {Store} from "@ngrx/store";
import {dailyConsumptionConfig, monthlyConsumptionConfig} from "./config";
import {selectLastBillingCycleChartData} from "../../../../../store/last-billing-cycle-chart/lastBillingCycleChart.selector";
import {ChartConfiguration,TooltipItem} from "chart.js";
import 'chartjs-adapter-moment';
import {BaseChartDirective} from "ng2-charts";
import 'chart.js'

@Component({
  selector: 'app-monthly-consumption-chart',
  templateUrl: './monthly-consumption-chart.component.html',
  styleUrls: ['./monthly-consumption-chart.component.scss']
})
export class MonthlyConsumptionChartComponent implements OnInit, OnChanges {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  barChartData: any;
  public activeBarChartOptions: ChartConfiguration<'bar'>['options']
  public barChartOptionsMonthly: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {position: 'bottom', onClick: (e) => (e as any).stopPropagation()},
      tooltip: {
        callbacks: {
          label(tooltipItem: TooltipItem<'bar'>): string | string[] | void {
            const dataLabel = tooltipItem.formattedValue + ' ' + (tooltipItem.dataset as any).uom.unit;
            return dataLabel;
          }
        }
      },
    }
  }
  public barChartOptionsDaily: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {position: 'bottom'},
      tooltip: {
        callbacks: {
          label(tooltipItem: TooltipItem<'bar'>): string | string[] | void {
            const dataLabel = tooltipItem.formattedValue + ' ' + (tooltipItem.dataset as any).uom;
            return dataLabel;
          }
        }
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'MMM D', // This is the default
          },
        }
      }
    }
  }
  barChartPlugins = [];
  barChartLegend = true;
  uom: string;
  isUpdate = true;

  constructor(private store: Store, private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.store.select(selectConsumptionChartData).subscribe(consumptionState => {
      if (monthlyConsumptionConfig.datasets && (monthlyConsumptionConfig.datasets as any).length > 0) {
        console.log(monthlyConsumptionConfig);
       this.uom = (monthlyConsumptionConfig.datasets as any)[0].uom.unit;
        this.barChartData = monthlyConsumptionConfig;
        this.activeBarChartOptions = this.barChartOptionsMonthly;
        this.isUpdate = false;
        setTimeout(()=>{
          this.isUpdate = true;
        },0)
      }
    });
    this.store.select(selectLastBillingCycleChartData).subscribe(data => {
      if (dailyConsumptionConfig.datasets && (dailyConsumptionConfig.datasets as any).length > 0) {
       (dailyConsumptionConfig.datasets as any)[0].uom = this.uom;
       (dailyConsumptionConfig.datasets as any)[1].uom = this.uom;
        this.barChartData = dailyConsumptionConfig;
        this.activeBarChartOptions = this.barChartOptionsDaily;
        this.isUpdate = false;
        setTimeout(()=>{
          this.isUpdate = true;
        },0)

      }
    })
  }


  ngOnChanges(changes: SimpleChanges): void {

  }


  getDaysSetFromNewRange(from, to) {
    return undefined;
  }
}
