import {Injectable} from '@angular/core';
import {ApiService} from "../../../../shared/api.service";
import {Observable, of} from "rxjs";
import * as moment from "moment/moment";

@Injectable({
  providedIn: 'root'
})
export class VacationsService {
  vacationID: any;

  constructor(private apiService: ApiService) {

  }

  getConsumerVacations():Observable<Object> {
    return  this.apiService.getConsumerVacations();

  }

  postVacations(data:VacationModel):Observable<any>{
    return this.apiService.postConsumerVacations(data)
  }
}
export interface VacationModel{
  vacationID: number;
  consumptionDailyLimit: string;
  endDate: string;
  startDate:string;
}
