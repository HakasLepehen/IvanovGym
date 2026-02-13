import { TuiInputModule, TuiMultiSelectModule } from "@taiga-ui/legacy";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// TODO: (Taiga UI migration) TUI_DIALOG_CLOSES_ON_BACK is deleted, you can create your own approach based on window.history property
import { TuiDayOfWeek, TuiLet } from '@taiga-ui/cdk';
import {
  TUI_FIRST_DAY_OF_WEEK,
  TuiRoot,
  TuiAlert,
  TuiNotification,
  TuiCalendar,
  TuiDataList,
  TuiError,
  TuiScrollbar,
  TuiScrollable,
  TuiIcon,
  TuiDialog,
  TuiButton,
  TuiTextfield,
} from '@taiga-ui/core';
import { TuiDataListWrapper, TuiAccordion, TuiFieldErrorPipe, TuiFieldErrorContentPipe, TuiButtonLoading, TuiInputNumber } from '@taiga-ui/kit';

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
    ...TuiAccordion,
    TuiScrollbar, TuiScrollable,
    TuiCalendar,
    TuiIcon,
    TuiMultiSelectModule,
    ...TuiDataList,
    ...TuiDataListWrapper,
    ...TuiTextfield,
    TuiNotification,
    TuiInputNumber,
    TuiLet,
    TuiInputModule,
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
    TuiInputModule,
    TuiError,
    TuiFieldErrorPipe, TuiFieldErrorContentPipe,
    TuiButton,
    TuiButtonLoading,
    ...TuiAccordion,
    TuiDialog,
    TuiScrollbar,
    TuiScrollable,
    TuiCalendar,
    TuiIcon,
    TuiMultiSelectModule,
    ...TuiDataList,
    ...TuiDataListWrapper,
    TuiNotification,
    TuiInputNumber,
    TuiLet,
    ...TuiTextfield,
  ],
})
export class TaigaModule { }
