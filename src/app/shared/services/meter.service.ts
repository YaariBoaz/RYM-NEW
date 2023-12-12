import {Injectable} from '@angular/core';
import {ApiService} from "../api.service";
import {LoggerService} from "./logger.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MeterService {
  getMetersResult$= new Subject<any>();
  meters

  constructor(private apiService: ApiService) {
    this.fetchMeter();
  }


  fetchMeter() {
    this.apiService.getConsumerMeters().subscribe(data => {
      this.meters = data;
      LoggerService.LOG('getConsumerMeters  - ', data)
      this.getMetersResult$.next(this.meters);
    })
  }


  getMeter() {
    return this.meters;
  }
}
