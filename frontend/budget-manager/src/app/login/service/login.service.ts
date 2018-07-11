import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';
import { LoginModule } from '../login.module';
import { Authenticate } from '../models/login.models';
import { catchError } from 'rxjs/operators';

const LOGIN_URL = 'http://localhost:8080/api/auth/signin';
@Injectable({
  providedIn: LoginModule
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  login(credentials: Authenticate): Observable<{User}> {
    this.http.post(LOGIN_URL, credentials).pipe(
      catchError(error => of(error))
    )
  }

  // login(credentials: Authenticate): Observable<any> {
  //   return this.apollo.watchQuery<any>({
  //     query: LoginQuery, variables: {
  //       username: credentials.username,
  //       password: credentials.password
  //     }
  //   }).valueChanges;
  // }

  // register(payload: Signon): Observable<any> {
  //   return this.apollo.mutate({
  //     mutation: RegisterMutation,
  //     variables: {
  //       username: payload.username,
  //       email: payload.email,
  //       password: payload.password
  //     }
  //   });
  // }
}

