import { NgModule, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TuiRootModule, TuiDialogModule, TuiAlertModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiFieldErrorPipeModule, TuiInputModule } from '@taiga-ui/kit';

@NgModule({
  declarations: [],
  imports: [CommonModule, TuiRootModule, TuiDialogModule, TuiAlertModule, TuiInputModule, TuiFieldErrorPipeModule],
  providers: [],
  exports: [CommonModule, TuiRootModule, TuiDialogModule, TuiAlertModule, TuiInputModule, TuiTextfieldControllerModule, TuiFieldErrorPipeModule],
})
export class TaigaModule {}
