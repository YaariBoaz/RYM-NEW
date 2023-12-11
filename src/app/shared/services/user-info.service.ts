import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";
import {LoggerService} from "./logger.service";

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private userInfo: Object;

  constructor(private apiService:ApiService) {
    this.fetchUserInfo();
  }

  fetchUserInfo(){
    this.apiService.getUserDetails().subscribe((data) =>{
      this.userInfo = data;
      LoggerService.LOG('getUserDetails  - ' ,data)
    })
  }

  getUserInfo(){
    return this.userInfo;
  }
}
