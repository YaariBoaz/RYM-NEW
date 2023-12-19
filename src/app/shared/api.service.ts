import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PhoneNumberItem} from "./models";
import {VacationModel} from "../features/dashboard/shared/vacations-modal/vacations.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_BASE_HREF = 'https://test-api.city-mind.com/'
  API_BASE_HREF_CTM = 'https://test-api-ctm.city-mind.com/'
  headers = {};


  constructor(private http: HttpClient) {

  }


  login(email: string, password: string):Observable<any> {
    return this.http.post(
      this.API_BASE_HREF + 'consumer/login',
      {"email": "jesmine87+RYMNEW@gmail.com", "pw": "abcd1234", "deviceId": "137603020733184952489033337332134674207"})
  }

  getUserDetails():Observable<any> {
    return this.http.get(this.API_BASE_HREF + 'consumer/me');
  }

  getConsumptionMonthly(from, to, meterCount?):Observable<any> {
    return this.http.get(this.API_BASE_HREF_CTM + 'consumption/monthly/' + from + '/' + to);
  }

  getConsumptionForecast():Observable<any> {
    return this.http.get(this.API_BASE_HREF_CTM + 'consumption/forecast');
  }

  getConsumptionForecastById():Observable<any> {
    return this.http.get(this.API_BASE_HREF + 'consumption/forecast/7861');
  }

  getConsumptionLastBillingCycle():Observable<any> {
    return this.http.get(this.API_BASE_HREF + 'consumption/daily/lastbillingCycle/2023-10-09/2023-11-09');
  }

  getConsumptionLastBillingCycleBetweenDates(date1, date2):Observable<any> {
    return this.http.get(this.API_BASE_HREF_CTM + 'consumption/daily/lastbillingCycle/' + date1 + '/' + date2);
  }

  getConsumptionLowRateLimit():Observable<any> {
    return this.http.get(this.API_BASE_HREF_CTM + 'consumption/Low-Rate-Limit');
  }

  postConsumerVacations(vacationsModel: VacationModel):Observable<any> {
    return this.http.post(this.API_BASE_HREF + 'consumer/vacations/', vacationsModel);
  }

  postConfirmAlert(logId):Observable<any> {
    return this.http.post(this.API_BASE_HREF_CTM + 'consumer/myalerts/confirm/' + logId, {});
  }

  getConsumerVacations():Observable<any> {
    return this.http.get(this.API_BASE_HREF + 'consumer/vacations/');
  }

  getConsumerMeters():Observable<any> {
    return this.http.get(this.API_BASE_HREF_CTM + 'consumer/meters');
  }

  getMeasurmentUnitsByMunicipal():Observable<any> {
    return this.http.get(this.API_BASE_HREF + 'municipals/h1/measurmentunits');
  }

  getMunicipalCustomerService():Observable<any> {
    return this.http.get(this.API_BASE_HREF + 'municipals/municipalCustomerService');
  }

  getConsumerAlertsForSettings():Observable<any> {
    return this.http.get(this.API_BASE_HREF_CTM + 'consumer/alertsForSettings');
  }

  getConsumerSettings():Observable<any> {
    return this.http.get(this.API_BASE_HREF + 'consumer/myalerts/settings');
  }

  getMyAlerts():Observable<any> {
    return this.http.get(this.API_BASE_HREF_CTM + 'consumer/myalerts');
  }

  getMessagesFromMunicipal():Observable<any> {
    return this.http.get(this.API_BASE_HREF_CTM + 'municipality/1982/messages');
  }

  getMessagesSubjectsFromMunicipal():Observable<any> {
    return this.http.get(this.API_BASE_HREF_CTM + 'municipality/1982/messages/message-subjects');
  }

  isMessageToMunicipalAllowed():Observable<any> {
    return this.http.get(this.API_BASE_HREF_CTM + 'municipality/1982/messages/is-messages-to-municipal-allowed');
  }


  getLastRead() {
    return this.http.get(this.API_BASE_HREF_CTM + 'consumption/last-read');
  }

  getSettings() {
    return this.http.get(this.API_BASE_HREF + 'consumer/myalerts/settings');
  }


  updatePhone(phoneNumberItem: PhoneNumberItem) {
    return this.http.put(this.API_BASE_HREF_CTM + 'consumer/phone', phoneNumberItem);
  }
}
