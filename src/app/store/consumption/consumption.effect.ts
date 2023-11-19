import {Injectable} from "@angular/core";
import {Actions} from "@ngrx/effects";
import {ApiService} from "../../shared/api.service";

@Injectable()
export class ConsumptionEffects {

  constructor(
    private actions$: Actions,
    private apiService:ApiService
  ) { }



}
