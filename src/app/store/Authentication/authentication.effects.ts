import { Injectable, Inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, catchError, exhaustMap, tap, first } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { AuthenticationService } from '../../core/services/auth.service';
import { login, loginSuccess, loginFailure, logout, logoutSuccess, Register, RegisterSuccess, RegisterFailure } from './authentication.actions';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { UserProfileService } from 'src/app/core/services/user.service';

@Injectable()
export class AuthenticationEffects {

  Register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(Register),
      exhaustMap(({ email, username, password }) => {
          return this.authenticationService.register({ email, username, password }).pipe(
            map((user) => {
              this.router.navigate(['/auth/login']);
              return RegisterSuccess({ user })
            })
          )
      })
    )
  );



  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      exhaustMap(({ email, password }) => {
          return this.authenticationService.login(email, password).pipe(map((user) => {
            localStorage.setItem('token',user.token);
            this.router.navigate(['']);
            return loginSuccess({ user });
          }))
      })
    )
  );


  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      tap(() => {
        // Perform any necessary cleanup or side effects before logging out
      }),
      exhaustMap(() => of(logoutSuccess()))
    )
  );

  constructor(
    @Inject(Actions) private actions$: Actions,
    private authenticationService: AuthenticationService,
    private router: Router) { }

}
