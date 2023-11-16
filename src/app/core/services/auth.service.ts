import { Injectable } from '@angular/core';

import { getFirebaseBackend } from '../../authUtils';
import { User } from 'src/app/store/Authentication/auth.models';
import {from, map, Observable, of} from 'rxjs';
import {ApiService} from "../../shared/api.service";
import {Router} from "@angular/router";


@Injectable({ providedIn: 'root' })

export class AuthenticationService {

    private user: User = new User();

    constructor(private apiService:ApiService,private router:Router) {
    }

    /**
     * Returns the current user
     */
    public getCurrentUser(): User {
        return this.user;
    }



  /**
   * Sets the current user
   * @param user new user
   */
  public  setUser(user:User){
      this.user = user;
  }


    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    login(email: string, password: string):Observable<any> {
      return this.apiService.login(email, password);
    }
    /**
     * Performs the register
     * @param email email
     * @param password password
     */
    register(user: User) {
        // return from(getFirebaseBackend().registerUser(user));

        return from(getFirebaseBackend().registerUser(user).then((response: any) => {
            const user = response;
            return user;
        }));
    }

    /**
     * Reset password
     * @param email email
     */
    resetPassword(email: string) {
        return getFirebaseBackend().forgetPassword(email).then((response: any) => {
            const message = response.data;
            return message;
        });
    }

    /**
     * Logout the user
     */
    logout() {
        // logout the user
        this.router.navigateByUrl('/auth/login2');
    }
}

