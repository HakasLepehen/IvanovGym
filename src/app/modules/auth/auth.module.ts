import { AuthComponent } from '../../components/auth/auth.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TaigaModule } from '../taiga/taiga.module';
import { RouterLink } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TaigaModule,
    RouterLink
  ],
  declarations: [AuthComponent],
  exports: [AuthComponent]
})
export class AuthModule {
}
