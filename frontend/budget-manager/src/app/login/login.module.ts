import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoginFormComponent } from './component/login-form/login-form.component';
import { LoginPageComponent } from './container/login-page/login-page.component';
import { LoginRoutingModule } from './login-routing.module';
import { SharedMaterialModule } from '../shared-material/shared-material.module';


@NgModule({
  imports: [
    SharedModule,
    SharedMaterialModule,
    LoginRoutingModule
  ],
  declarations: [LoginFormComponent, LoginPageComponent]
})
export class LoginModule { }
