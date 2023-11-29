import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
 import {Store} from "@ngrx/store";
import {dailyConsumptionConfig, monthlyConsumptionConfig} from "./config";
import {ChartConfiguration, TooltipItem} from "chart.js";
import 'chartjs-adapter-moment';
import {BaseChartDirective} from "ng2-charts";
import 'chart.js'
import {
  selectLastBillingCycleChartData
} from "../../../../store/last-billing-cycle-chart/lastBillingCycleChart.selector";
import {selectConsumptionChartData} from "../../../../store/consumption/consumption.selector";

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
  isChart = true;
  monthlyHeaders = ['Date', 'Consumption']
  dailyHeaders = ['Date', 'Consumption', 'Alert']
  headers: string[];
  monthlyTableData: TableDataItem[]
  dailyTableData: TableDataItem[]
  currentTableData: any[];
  isDaily = false;

  constructor(private store: Store, private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.store.select(selectConsumptionChartData).subscribe(consumptionState => {
      if (monthlyConsumptionConfig.datasets && (monthlyConsumptionConfig.datasets as any).length > 0) {
        console.log(monthlyConsumptionConfig);
        this.isDaily = false;
        this.uom = (monthlyConsumptionConfig.datasets as any)[0].uom.unit;
        this.barChartData = monthlyConsumptionConfig;
        this.activeBarChartOptions = this.barChartOptionsMonthly;
        this.headers = this.monthlyHeaders;
        this.monthlyTableData = new Array<TableDataItem>();
        this.barChartData.labels.forEach((item, index) => {
          this.monthlyTableData.push({
            date: item,
            consumption: this.barChartData.datasets[0].data[index] + this.barChartData.datasets[1].data[index],
          })
        });
        this.currentTableData = this.monthlyTableData;
        this.isUpdate = false;
        setTimeout(() => {
          this.isUpdate = true;
        }, 0)
      }
    });
    this.store.select(selectLastBillingCycleChartData).subscribe(data => {
      if (dailyConsumptionConfig.datasets && (dailyConsumptionConfig.datasets as any).length > 0) {
        (dailyConsumptionConfig.datasets as any)[0].uom = this.uom;
        (dailyConsumptionConfig.datasets as any)[1].uom = this.uom;
        this.barChartData = dailyConsumptionConfig;
        this.headers = this.dailyHeaders;
        this.dailyTableData = new Array<TableDataItem>();
        this.isDaily = true;
        const allDataset = [...this.barChartData.datasets[0].data, ...this.barChartData.datasets[1].data];
        allDataset.sort((a, b) => {
          return a.x.getTime() - b.x.getTime()
        });

        allDataset.forEach((item, index) => {
          let alertName = '-';
          if(data[index].meterStatusDesc){
            alertName = data[index].meterStatusDesc;
          }
          this.dailyTableData.push({
            date: item.x,
            consumption: item.y,
            alertName: alertName,
          })
        });
        this.currentTableData = this.dailyTableData;
        this.activeBarChartOptions = this.barChartOptionsDaily;
        this.isUpdate = false;
        setTimeout(() => {
          this.isUpdate = true;
        }, 0)

      }
    })
  }


  ngOnChanges(changes: SimpleChanges): void {

  }


  getDaysSetFromNewRange(from, to) {
    return undefined;
  }
}



export interface TableDataItem {
  date: string,
  consumption: number,
  alertName?: string
}
