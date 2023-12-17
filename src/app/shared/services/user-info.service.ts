import {Injectable} from '@angular/core';
import {ApiService} from "../api.service";
import {LoggerService} from "./logger.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  userInfo: UserInfoModel;
  getUserInfoResult$ = new Subject<any>();

  constructor(private apiService: ApiService) {
    this.fetchUserInfo();
  }

  fetchUserInfo() {
    this.apiService.getUserDetails().subscribe(((data: UserInfoModel) => {
      this.userInfo = data;
      LoggerService.LOG('getUserDetails  - ', data)
      this.getUserInfoResult$.next(this.userInfo);
    }));
  }
}

export interface UserInfoModel {
  accountNumber: string;
  firstName: string;
  lastName: string;
  municipalId: number;
  phoneNumber: UserInfoPhoneNumber;
}

export interface UserInfoPhoneNumber {
  AdditionalPhoneNumber: string;
  countryCode: string;
  phoneNumber: string;
}
