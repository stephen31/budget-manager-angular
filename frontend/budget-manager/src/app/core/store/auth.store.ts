import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Authenticate } from '../models/login.models';
import { User } from '../models/user.model';
import { AuthService } from '../services/auth.service';
import { Register } from '../models/register.models';

@Injectable({
  providedIn: 'root'
})
export class AuthStore {

  private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _isPendingLogin: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _isPendingRegister: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _errorMessage: BehaviorSubject<string> = new BehaviorSubject('');
  private _user: BehaviorSubject<User> = new BehaviorSubject(null);

  public readonly isLoggedIn: Observable<boolean> = this._isLoggedIn.asObservable();
  public readonly isPendingLogin: Observable<boolean> = this._isPendingLogin.asObservable();
  public readonly isPendingRegister: Observable<boolean> = this._isPendingRegister.asObservable();
  public readonly errorMessage: Observable<string> = this._errorMessage.asObservable();
  public readonly user: Observable<User> = this._user.asObservable();


  public setIsLoggedIn(value: boolean) {
    this._isLoggedIn.next(value);
  }

  public setIsPendingLogin(value: boolean) {
    this._isPendingLogin.next(value);
  }

  public setIsPendingRegister(value: boolean) {
    this._isPendingRegister.next(value);
  }

  public setErrorMessage(value: string) {
    this._errorMessage.next(value);
  }

  public setUser(user: User) {
    this._user.next(user);
  }

  constructor() { }
}
