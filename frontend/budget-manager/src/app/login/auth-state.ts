import { NgxsOnInit, State, Selector, StateContext, Action, Store } from '@ngxs/store';
import { AuthStateModel, Authenticated } from './auth-model';
import { Login, LoginSuccess, LoginFailed } from './auth-actions';
import { LoginService } from './service/login.service';
import { map, tap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    initialized: false,
    user: null,
    jwt: null,
    errors: null,
    isPending: false
  }
})
export class AuthState implements NgxsOnInit {
  constructor(private store: Store, private loginService: LoginService) { }

  @Selector()
  static getInitialized(state: AuthStateModel) {
    return state.initialized;
  }

  @Selector()
  static getUser(state: AuthStateModel) {
    return state.user;
  }

  @Selector()
  static getJwt(state: AuthStateModel) {
    return state.jwt;
  }

  @Selector()
  static getErrors(state: AuthStateModel) {
    return state.errors;
  }

  @Selector()
  static getPending(state: AuthStateModel) {
    return state.isPending;
  }

  /**
   * COMANDS
   */

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    ctx.patchState({
      isPending: true
    });
    return this.loginService.login(action).pipe(
      tap((user: Authenticated) => {
        ctx.dispatch(new LoginSuccess(user));
      }),
      catchError((error) => {
        return ctx.dispatch(new LoginFailed(error));
      })
    );
  }

  /**
   *EVENTS
   */
  @Action(LoginSuccess)
  setUserStateOnSucess(ctx: StateContext<AuthStateModel>, event: LoginSuccess) {
    ctx.patchState({
      initialized: true,
      user: {
        username: event.user.username,
        email: event.user.email,
        createAt: event.user.createAt
      },
      jwt: event.user.jwt,
      errors: null,
      isPending: false
    });
  }

  @Action(LoginFailed)
  setErrors(ctx: StateContext<AuthStateModel>, event: LoginFailed) {
    ctx.patchState({
      errors: event.errors,
      isPending: false
    });
  }

  ngxsOnInit() { }
}
