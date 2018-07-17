import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { CookieModule } from 'ngx-cookie';
import { SharedMaterialModule } from '../shared-material/shared-material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthInterceptor } from './services/auth.interceptors';
import { HTTP_INTERCEPTORS } from '../../../node_modules/@angular/common/http';
import { NavbarContainerComponent } from './containers/navbar-container/navbar-container.component';
@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedMaterialModule,
    CookieModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  declarations: [CoreComponent, NavbarContainerComponent, NavbarComponent]
})
export class CoreModule { }
