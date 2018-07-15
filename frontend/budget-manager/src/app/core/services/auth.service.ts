import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Authenticate } from '../models/login.models';
import { User } from '../models/user.model';
import { Register } from '../models/register.models';
import { AuthStore } from '../store/auth.store';
import { Router } from '@angular/router';

const LOGIN_URL = environment.serverUrl + '/login';
const REGISTER_URL = environment.serverUrl + '/register';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private authStore: AuthStore, private route: Router) {
  }

  login(credentials: Authenticate) {
    this.authStore.setIsPendingLogin(true);
    this.http.post(LOGIN_URL, credentials, { withCredentials: true }).pipe(
      catchError((error) => {
        return throwError(error.error);
      })
    ).subscribe((response: { data: User, message: string }) => {
      this.authStore.setUser(response.data);
      this.authStore.setErrorMessage(null);
      this.authStore.setIsLoggedIn(true);
      this.authStore.setIsPendingLogin(false);
    }, (error) => {
      this.authStore.setIsLoggedIn(false);
      this.authStore.setErrorMessage(error.message);
      this.authStore.setIsPendingLogin(false);
    });
  }

  register(payload: Register) {
    this.http.post(REGISTER_URL, payload, { withCredentials: true }).pipe(
      catchError((error) => {
        return throwError(error.error);
      })
    ).subscribe((response: { data: User, message: string }) => {
      this.authStore.setUser(response.data);
      this.authStore.setErrorMessage(null);
      this.authStore.setIsLoggedIn(true);
      this.authStore.setIsPendingRegister(false);
      this.route.navigate(['/']);
    }, (error) => {
      this.authStore.setIsLoggedIn(false);
      this.authStore.setErrorMessage(error.message);
      this.authStore.setIsPendingRegister(false);
    });
  }
}
