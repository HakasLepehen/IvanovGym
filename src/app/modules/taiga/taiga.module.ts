import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TUI_DIALOG_CLOSES_ON_BACK, TuiDayOfWeek } from '@taiga-ui/cdk';
import {
  TUI_FIRST_DAY_OF_WEEK,
  TuiAlertModule,
  TuiButtonModule,
  TuiCalendarModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiErrorModule,
  TuiNotificationModule,
  TuiRootModule,
  TuiScrollbarModule,
  TuiSvgModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import {
  TuiAccordionModule,
  TuiDataListWrapperModule,
  TuiFieldErrorPipeModule,
  TuiInputModule,
  TuiMultiSelectModule,
} from '@taiga-ui/kit';
import { of } from 'rxjs';

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
    TuiDialogModule,
    TuiScrollbarModule,
    TuiCalendarModule,
    TuiSvgModule,
    TuiMultiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiTextfieldControllerModule,
    TuiNotificationModule
  ],
  providers: [
    {
      provide: TUI_DIALOG_CLOSES_ON_BACK,
      useValue: of(true),
    },
    {
      provide: TUI_FIRST_DAY_OF_WEEK,
      useValue: TuiDayOfWeek.Monday
    }
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
    TuiDialogModule,
    TuiScrollbarModule,
    TuiCalendarModule,
    TuiSvgModule,
    TuiMultiSelectModule,
    TuiDataListModule,
    TuiDataListWrapperModule,
    TuiNotificationModule
  ],
})
export class TaigaModule {}
