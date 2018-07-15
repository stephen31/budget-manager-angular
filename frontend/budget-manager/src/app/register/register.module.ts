import { NgModule } from '@angular/core';
import { RegisterFormComponent } from './component/register-form/register-form.component';
import { SharedModule } from '../shared/shared.module';
import { SharedMaterialModule } from '../shared-material/shared-material.module';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterPageComponent } from './container/register-page/register-page.component';
@NgModule({
  imports: [
    SharedModule,
    SharedMaterialModule,
    RegisterRoutingModule
  ],
  declarations: [RegisterFormComponent, RegisterPageComponent]
})
export class RegisterModule { }
