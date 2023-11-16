import { Injectable, Inject } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {login, loginFailure, loginSuccess, logoutSuccess} from "./authentication.actions";
import {catchError, tap, map, switchMap} from "rxjs/operators";
import {AuthenticationService} from "../../core/services/auth.service";
import {of} from "rxjs";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";


@Injectable()
export class AuthenticationEffects {



  login$ =  createEffect(() => this.actions$.pipe(
    ofType(login),
    switchMap(({ email, password }) =>
      this.authenticationService.login(email, password).pipe(
        map((token) => loginSuccess({ user:token })),
        catchError(error => of(loginFailure({ error })))
      )
    )
  ));



  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(loginSuccess),
    tap((action) =>localStorage.setItem('token',action.user.token)),
    tap(() => this.router.navigateByUrl('/dashboards/saas').then(()=>{
      console.log('Went to dashboar');
    }))
  ), { dispatch: false });


  constructor(private actions$:Actions,
              private router:Router,
              private store:Store,
              private authenticationService:AuthenticationService) { }

}
