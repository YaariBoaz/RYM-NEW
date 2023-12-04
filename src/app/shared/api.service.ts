import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {VacationsModel} from "../store/vacations/vacations.reducer";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_BASE_HREF = 'https://test-api.city-mind.com/'
  API_BASE_HREF_CTM = 'https://test-api-ctm.city-mind.com/'
  headers = {};


  constructor(private http: HttpClient) {

  }


  login(email: string, password: string) {
    return this.http.post(
      this.API_BASE_HREF + 'consumer/login',
      {"email": "jesmine87+RYMNEW@gmail.com", "pw": "abcd1234", "deviceId": "137603020733184952489033337332134674207"})
  }

  getUserDetails() {
    return this.http.get(this.API_BASE_HREF + 'consumer/me');
  }

  getConsumptionMonthly(from, to, meterCount?) {
    return this.http.get(this.API_BASE_HREF_CTM + 'consumption/monthly/' + from + '/' + to);
  }

  getConsumptionForecast() {
    return this.http.get(this.API_BASE_HREF_CTM + 'consumption/forecast');
  }

  getConsumptionForecastById() {
    return this.http.get(this.API_BASE_HREF + 'consumption/forecast/7861');
  }

  getConsumptionLastBillingCycle() {
    return this.http.get(this.API_BASE_HREF + 'consumption/daily/lastbillingCycle/2023-10-09/2023-11-09');
  }

  getConsumptionLastBillingCycleBetweenDates(date1, date2) {
    return this.http.get(this.API_BASE_HREF_CTM + 'consumption/daily/lastbillingCycle/' + date1 + '/' + date2);
  }

  getConsumptionLowRateLimit() {
    return this.http.get(this.API_BASE_HREF_CTM + 'consumption/Low-Rate-Limit');
  }

  postConsumerVacations(vacationsModel: VacationsModel) {
    return this.http.post(this.API_BASE_HREF_CTM + 'consumer/vacations', vacationsModel);
  }

  getConsumerMeters() {
    return this.http.get(this.API_BASE_HREF_CTM + 'consumer/meters');
  }

  getMeasurmentUnitsByMunicipal() {
    return this.http.get(this.API_BASE_HREF + 'municipals/h1/measurmentunits');
  }

  getMunicipalCustomerService() {
    return this.http.get(this.API_BASE_HREF_CTM + 'municipals/municipalCustomerService');
  }

  getConsumerAlertsForSettings() {
    return this.http.get(this.API_BASE_HREF_CTM + 'consumer/alertsForSettings');
  }
  getConsumerSettings() {
    return this.http.get(this.API_BASE_HREF + 'consumer/myalerts/settings');
  }

  getMyAlerts() {
    return this.http.get(this.API_BASE_HREF_CTM + 'consumer/myalerts');
  }

  getMessagesFromMunicipal() {
    return this.http.get(this.API_BASE_HREF_CTM + 'municipality/1982/messages');
  }

  getMessagesSubjectsFromMunicipal() {
    return this.http.get(this.API_BASE_HREF_CTM + 'municipality/1982/messages/message-subjects');
  }

  isMessageToMunicipalAllowed() {
    return this.http.get(this.API_BASE_HREF_CTM + 'municipality/1982/messages/is-messages-to-municipal-allowed');
  }


  getLastRead() {
    return this.http.get(this.API_BASE_HREF_CTM + 'consumption/last-read');
  }
}
