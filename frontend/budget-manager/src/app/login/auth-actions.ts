import { User } from './auth-model';


// Actions
export class Login {
  static type = '[Auth] Login';
  constructor(public username: string, public password: string) {}
}

export class Logout {
  static type = '[Auth] Logout';
}

// Events
export class LoginSuccess {
  static type = '[Auth] LoginSucess';
  constructor(public user: User) {}
}

export class LoginFailed {
  static type = '[Auth] LoginFailed';
  constructor(public error: any) {}
}

export class LoginRedirect {
  static type = '[Auth] LoginRedirect';
}