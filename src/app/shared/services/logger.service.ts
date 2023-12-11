import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  static LOG(text:string,data:any){
    console.log('[LOG MESSAGE] :'  +text,data);
  }
}
