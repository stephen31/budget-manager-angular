import { NgxsOnInit, State, Selector, StateContext, Action } from '@ngxs/store';
import { AuthStateModel } from './auth-model';
import { Login, LoginSuccess } from './auth-actions';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    initialized: false,
    user: null,
    jwt: null
  }
})
export class AuthState implements NgxsOnInit {
  constructor(private store) {}

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

  /**
   * COMANDS
   */

   @Action(Login)
   login(ctx: StateContext<AuthStateModel>) {
    ctx.dispatch(new LoginSuccess({username: 'test', createAt: new Date(), email: 'email'}));
   }

  /**
   *EVENTS
   */
   @Action(LoginSuccess)
   setUserStateOnSucess(ctx: StateContext<AuthStateModel>, event: LoginSuccess) {
    ctx.patchState({
      user: event.user
    });
   }

  ngxsOnInit() {}
}
