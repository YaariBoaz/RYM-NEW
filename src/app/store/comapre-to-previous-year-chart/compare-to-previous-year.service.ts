import {Injectable} from '@angular/core';
import {ApiService} from "../../shared/api.service";
import {Observable} from "rxjs";
import {CompareToPreviousYearChartData} from "./comapre-to-previous-year-chart.reducer";
import {compareToPreviousConfig} from "../../features/dashboard/shared/monthly-consumption-chart/config";

@Injectable({
  providedIn: 'root'
})
export class CompareToPreviousYearService {

  constructor(private apiService: ApiService) {
  }

  getCompareToPreviousYearData(dateRange: { from: string, to: string }): Observable<any> {

    return this.apiService.getConsumptionMonthly(dateRange.from, dateRange.to)
  }

  getMeasurmentUnitsByMunicipal(): Observable<any> {
    return this.apiService.getMeasurmentUnitsByMunicipal();

  }
  prepareDataForCharts(data: CompareToPreviousYearChartData[],uom:string) {

    const year1: any[] = [];
    const year2: any[] = [];
    const year3: any[] = [];
    const xAxis: string[] = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    let monthIndex = 12;
    const years = [...new Set(data.map(item => {
      return new Date(item.consDate).getFullYear()
    }))];
    data.map((item, index) => {
      if (new Date(item.consDate).getFullYear() === years[0]) {
        year1.push(Math.round((item.cons + Number.EPSILON) * 100) / 100);
      } else if (new Date(item.consDate).getFullYear() === years[1]) {
        year2.push(Math.round((item.cons + Number.EPSILON) * 100) / 100);
      } else {
        year3.push(Math.round((item.cons + Number.EPSILON) * 100) / 100);
      }
    })
    compareToPreviousConfig.datasets = [];
    compareToPreviousConfig.datasets.push({
      data: year1,
      label: years[0].toString(),
      backgroundColor: '#acacac',
      uom:uom
    } as any);
    compareToPreviousConfig.datasets.push({
      data: year2,
      label: years[1].toString(),
      backgroundColor: '#1cd3d2',
      uom:uom
    } as any);
    compareToPreviousConfig.datasets.push({
      data: year3,
      label: years[2].toString(),
      backgroundColor: '#3daefa',
      uom:uom
    } as any);
    compareToPreviousConfig.labels = xAxis;
  }
}

