import { AuthComponent } from './../../components/auth/auth.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [AuthComponent],
  exports: [AuthComponent]
})
export class AuthModule { }
