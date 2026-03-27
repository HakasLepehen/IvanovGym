import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// TODO: (Taiga UI migration) TUI_DIALOG_CLOSES_ON_BACK is deleted, you can create your own approach based on window.history property
import { TuiDayOfWeek } from '@taiga-ui/cdk';
import {
  TUI_FIRST_DAY_OF_WEEK,
  TuiRoot,
  TuiAlert,
  TuiError,
  TuiDialog,
  TuiButton,
  TuiCalendar,
  TuiTextfieldComponent,
  TuiScrollbar,
  TuiTextfield
} from '@taiga-ui/core';
import {
  TuiFieldErrorPipe,
  TuiFieldErrorContentPipe,
  TuiButtonLoading,
  TuiAccordion
} from '@taiga-ui/kit';
import {TuiForm} from '@taiga-ui/layout'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TuiRoot,
    TuiDialog,
    TuiAlert,
    TuiError,
    TuiFieldErrorPipe,
    TuiFieldErrorContentPipe,
    TuiButton,
    TuiButtonLoading,
    TuiCalendar,
    TuiTextfieldComponent,
    TuiScrollbar,
    ...TuiAccordion,
    ...TuiTextfield,
    TuiForm,
  ],
  providers: [
    {
      provide: TUI_FIRST_DAY_OF_WEEK,
      useValue: TuiDayOfWeek.Monday
    },
  ],
  exports: [
    CommonModule,
    TuiRoot,
    TuiDialog,
    TuiAlert,
    TuiError,
    TuiFieldErrorPipe,
    TuiFieldErrorContentPipe,
    TuiButton,
    TuiButtonLoading,
    TuiCalendar,
    TuiTextfieldComponent,
    TuiScrollbar,
    ...TuiAccordion,
    ...TuiTextfield,
    TuiForm
  ],
})
export class TaigaModule { }