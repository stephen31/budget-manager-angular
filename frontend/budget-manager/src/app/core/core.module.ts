import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { CoreComponent } from './core.component';
import { SharedMaterialModule } from '../shared-material/shared-material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
@NgModule({
  imports: [
    CommonModule,
    CoreRoutingModule,
    SharedMaterialModule,
  ],
  declarations: [CoreComponent, NavbarComponent]
})
export class CoreModule { }
