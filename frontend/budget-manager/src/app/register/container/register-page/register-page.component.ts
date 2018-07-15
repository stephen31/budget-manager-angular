import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Authenticate } from '../../../core/models/login.models';
import { AuthStore } from '../../../core/store/auth.store';
import { AuthService } from '../../../core/services/auth.service';
import { Register } from '../../../core/models/register.models';

@Component({
  selector: 'bm-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

  pending$: Observable<boolean>;
  errorMessage$: Observable<any>;

  constructor(private authStore: AuthStore, private authService: AuthService) {
    this.pending$ = this.authStore.isPendingRegister;
    this.errorMessage$ = this.authStore.errorMessage;
  }

  onSubmit(event: Register) {
    this.authService.register({
      name: event.name,
      username: event.username,
      password: event.password,
      confirmPassword: event.confirmPassword,
      email: event.email
    });
  }

}
