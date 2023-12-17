import {Component, OnInit, ViewChild} from '@angular/core';
import {ChartConfiguration, TooltipItem} from "chart.js";
import {Store} from "@ngrx/store";
import * as moment from "moment";
import {compareToPreviousConfig} from "../monthly-consumption-chart/config";
import {BaseChartDirective} from "ng2-charts";
import {
  fetchComparePreviousYearChartData
} from "../../../../store/comapre-to-previous-year-chart/comapre-to-previous-year-chart.action";
import {
  selectCompareToPreviousYearChartData
} from "../../../../store/comapre-to-previous-year-chart/comapre-to-previous-year-chart.selector";

@Component({
  selector: 'app-comapre-to-previous-year-chart',
  templateUrl: './comapre-to-previous-year-chart.component.html',
  styleUrls: ['./comapre-to-previous-year-chart.component.scss']
})
export class ComapreToPreviousYearChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;

  chartData: any;
  chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    devicePixelRatio: 10,
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
        type: 'category',
      }
    }
  };
  chartLegend = true;

  constructor(private store: Store) {
  }

  // 2021-01-01/2023-11-30
  ngOnInit(): void {
    this.store.dispatch(fetchComparePreviousYearChartData(this.getDatesToCompare()));
    this.store.select(selectCompareToPreviousYearChartData).subscribe(data => {
      if (compareToPreviousConfig.datasets && (compareToPreviousConfig.datasets as any).length > 0) {
        this.chartData = compareToPreviousConfig;
        this.chart.update()
      }
    })
  }

  private getDatesToCompare() {
    const from = moment();
    from.set('months', 0)
    from.set('day', 0)
    from.set('year', new Date().getFullYear() - 2);
    return {from: from.format('YYYY-MM-DD'), to: moment().format('YYYY-MM-DD')};
  }
}
