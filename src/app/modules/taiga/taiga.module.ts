import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TuiTextfieldControllerModule,
  TuiErrorModule,
  TuiButtonModule, TuiLoaderModule, TuiDialogService
} from '@taiga-ui/core';
import { TuiAccordionModule, TuiFieldErrorPipeModule, TuiInputModule } from '@taiga-ui/kit';
import { of } from 'rxjs';
import { TUI_DIALOG_CLOSES_ON_BACK } from '@taiga-ui/cdk';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiInputModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiButtonModule,
    TuiAccordionModule,
    TuiLoaderModule,
    TuiDialogModule
  ],
  providers: [
    {
      provide: TUI_DIALOG_CLOSES_ON_BACK,
      useValue: of(true),
    },
  ],
  exports: [
    CommonModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiErrorModule,
    TuiFieldErrorPipeModule,
    TuiButtonModule,
    TuiAccordionModule,
    TuiLoaderModule,
    TuiDialogModule
  ]
})
export class TaigaModule {
}
