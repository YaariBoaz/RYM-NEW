import {Injectable} from '@angular/core';
import {ApiService} from "../api.service";
import {LoggerService} from "./logger.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MeterService {
  getMetersResult$ = new Subject<any>();
  meters:MeterModel[];

  constructor(private apiService: ApiService) {

  }

  fetchMeter() {
    this.apiService.getConsumerMeters().subscribe((data: MeterModel[]) => {
      this.meters = data;
      LoggerService.LOG('getConsumerMeters  - ', data)
      this.getMetersResult$.next(this.meters);
    })
  }
}

export interface MeterModel {
  fullAddress: string;
  meterCount: number;
  meterSn: string;
}
