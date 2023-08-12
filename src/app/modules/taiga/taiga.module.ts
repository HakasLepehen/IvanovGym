import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TuiTextfieldControllerModule,
  TuiErrorModule,
  TuiButtonModule, TuiLoaderModule
} from '@taiga-ui/core';
import { TuiAccordionModule, TuiFieldErrorPipeModule, TuiInputModule } from '@taiga-ui/kit';

@NgModule({
  declarations: [],
  imports: [CommonModule, TuiRootModule, TuiDialogModule, TuiAlertModule, TuiInputModule, TuiErrorModule, TuiFieldErrorPipeModule, TuiButtonModule, TuiAccordionModule, TuiLoaderModule],
  providers: [],
  exports: [CommonModule, TuiRootModule, TuiDialogModule, TuiAlertModule, TuiInputModule, TuiTextfieldControllerModule, TuiErrorModule, TuiFieldErrorPipeModule, TuiButtonModule, TuiAccordionModule, TuiLoaderModule]
})
export class TaigaModule {
}
