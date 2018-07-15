import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Authenticate } from '../../../core/models/login.models';
import { AuthStore } from '../../../core/store/auth.store';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'bm-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  pending$: Observable<boolean>;
  errorMessage$: Observable<any>;

  constructor(private authStore: AuthStore, private authService: AuthService) {
    this.pending$ = this.authStore.isPendingLogin;
    this.errorMessage$ = this.authStore.errorMessage;
  }

  onSubmit(event: Authenticate) {
    this.authService.login({username: event.username, password: event.password});
  }

}
