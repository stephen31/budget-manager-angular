import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  exports: [ FormsModule, CommonModule, ReactiveFormsModule ]
})
export class SharedModule { }
