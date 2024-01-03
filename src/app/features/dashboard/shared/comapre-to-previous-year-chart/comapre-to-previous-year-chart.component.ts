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
import {
  CompareToPreviousYearService
} from "../../../../store/comapre-to-previous-year-chart/compare-to-previous-year.service";
import {forkJoin} from "rxjs";

@Component({
  selector: 'app-comapre-to-previous-year-chart',
  templateUrl: './comapre-to-previous-year-chart.component.html',
  styleUrls: ['./comapre-to-previous-year-chart.component.scss']
})
export class ComapreToPreviousYearChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;
  uom: string;
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
            const dataLabel = tooltipItem.formattedValue + ' ' + tooltipItem.dataset['uom'];
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


  constructor(private compareToPreviousYearService: CompareToPreviousYearService) {
  }

  // 2021-01-01/2023-11-30
  ngOnInit(): void {
    forkJoin([this.compareToPreviousYearService.getMeasurmentUnitsByMunicipal(),
      this.compareToPreviousYearService.getCompareToPreviousYearData(this.getDatesToCompare())
    ]).subscribe(data => {
      if (data) {
        this.uom = data[0].unit;
        this.compareToPreviousYearService.prepareDataForCharts(data[1],this.uom);
        if (compareToPreviousConfig.datasets && (compareToPreviousConfig.datasets as any).length > 0) {
          this.chartData = compareToPreviousConfig;
          this.chart.update()
        }
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
