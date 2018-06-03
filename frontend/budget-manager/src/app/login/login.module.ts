import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { LoginFormComponent } from './component/login-form/login-form.component';
import { LoginPageComponent } from './container/login-page/login-page.component';
import {MatCardModule} from '@angular/material/card';
import { LoginRoutingModule } from './login-routing.module';


@NgModule({
  imports: [
    SharedModule,
    MatCardModule,
    LoginRoutingModule
  ],
  declarations: [LoginFormComponent, LoginPageComponent]
})
export class LoginModule { }
