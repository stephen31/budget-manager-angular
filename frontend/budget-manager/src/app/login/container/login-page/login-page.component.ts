import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Login } from '../../auth-actions';
import { Authenticate } from '../../auth-model';
import { Observable } from 'rxjs';
import { AuthState } from '../../auth-state';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  pending$: Observable<boolean>;
  error$: Observable<any>;

  constructor(private store: Store) {
    this.pending$ = this.store.select(AuthState.getPending);
    this.error$ = this.store.select(AuthState.getErrors);
  }

  onSubmit(event: Authenticate) {
    this.store.dispatch(new Login(event.username, event.password));
  }

}
