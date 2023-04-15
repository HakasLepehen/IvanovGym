import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TuiTextfieldControllerModule,
  TuiErrorModule,
  TuiButtonModule
} from '@taiga-ui/core';
import { TuiFieldErrorPipeModule, TuiInputModule } from '@taiga-ui/kit';

@NgModule({
  declarations: [],
  imports: [CommonModule, TuiRootModule, TuiDialogModule, TuiAlertModule, TuiInputModule, TuiErrorModule, TuiFieldErrorPipeModule, TuiButtonModule],
  providers: [],
  exports: [CommonModule, TuiRootModule, TuiDialogModule, TuiAlertModule, TuiInputModule, TuiTextfieldControllerModule, TuiErrorModule, TuiFieldErrorPipeModule, TuiButtonModule]
})
export class TaigaModule {
}
