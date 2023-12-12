import {Injectable} from '@angular/core';
import {ApiService} from "../api.service";
import {LoggerService} from "./logger.service";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private userInfo: Object;
  getUserInfoResult$=new Subject<any>();

  constructor(private apiService: ApiService) {
    this.fetchUserInfo();
  }

  fetchUserInfo() {
    this.apiService.getUserDetails().subscribe((data) => {
      this.userInfo = data;
      LoggerService.LOG('getUserDetails  - ', data)
      this.getUserInfoResult$.next(this.userInfo);
    })
  }
}
