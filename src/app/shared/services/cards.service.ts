import {Injectable} from '@angular/core';
import {ApiService} from "../api.service";
import * as moment from "moment/moment";
import {BehaviorSubject, forkJoin, Subject} from "rxjs";
import {monthlyConsumptionConfig} from "../../features/dashboard/shared/monthly-consumption-chart/config";
import {ConsumptionFromToMonthlyObject, DateHelperService} from "../../features/dashboard/shared/utils/date-helper";
import {LoggerService} from "./logger.service";

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  getCardsDataResult$ = new BehaviorSubject<any>(null);
  private uom: any;

  constructor(private apiService: ApiService, private dateHelper: DateHelperService) {
    this.fetchCardsData({from: new Date().toString(), to: new Date().toString()})
  }

  fetchCardsData(data: { from: string, to: string }) {
    const lastRead$ = this.apiService.getLastRead();
    const uom$ = this.apiService.getMeasurmentUnitsByMunicipal();
    const forecast$ = this.apiService.getConsumptionForecast();
    const lastMonthlyRead$ = this.apiService.getConsumptionMonthly(moment(data.from).format('YYYY-MM'), moment(data.to).format('YYYY-MM'), '');
    const monthlyLowRate$ = this.apiService.getConsumptionLowRateLimit();
    forkJoin([lastRead$, uom$, forecast$, lastMonthlyRead$, monthlyLowRate$]).subscribe(([
                                                                                           lastRead,
                                                                                           uom,
                                                                                           forecast,
                                                                                           lastMonthlyRead,
                                                                                           monthlyLowRate]) => {
      const cardsData = {
        currentMeterReading: (lastRead as any)[0].read,
        currentMonthConsumption: (lastMonthlyRead as any)[(lastMonthlyRead as any).length - 1].cons,
        endOfMonthForecast: (forecast as any).estimatedConsumption,
        uom: (uom as any).unit,
        monthlyLowRate: (monthlyLowRate as number)
      }
      this.getCardsDataResult$.next(cardsData)
      LoggerService.LOG('getUserDetails  - ', cardsData)
    });
  }



  getUOM() {
    return this.uom;
  }
}



