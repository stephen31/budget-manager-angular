import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProgressbarComponent } from './components/progressbar/progressbar.component';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [ProgressbarComponent],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, ProgressbarComponent ]
})
export class SharedModule { }
