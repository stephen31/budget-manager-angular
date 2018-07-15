import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedMaterialModule } from './shared-material/shared-material.module';
import { CoreComponent } from './core/core.component';
import { CoreModule } from './core/core.module';
@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    SharedMaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [CoreComponent]
})
export class AppModule {}
