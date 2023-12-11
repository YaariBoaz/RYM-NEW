import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";
import {LoggerService} from "./logger.service";

@Injectable({
  providedIn: 'root'
})
export class MeterService {
  private meters: any;

  constructor(private apiService:ApiService) {
    this.fetchMeter();
  }


  fetchMeter(){
    this.apiService.getConsumerMeters().subscribe(data =>{
     this.meters = data;
      LoggerService.LOG('getConsumerMeters  - ' ,data)
    })
  }


  getMeter(){
    return this.meters;
  }
}
