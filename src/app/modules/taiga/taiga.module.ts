import { TuiTextfieldControllerModule, TuiInputModule, TuiMultiSelectModule } from "@taiga-ui/legacy";
import { NG_EVENT_PLUGINS } from "@taiga-ui/event-plugins";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

// TODO: (Taiga UI migration) TUI_DIALOG_CLOSES_ON_BACK is deleted, you can create your own approach based on window.history property
import { TUI_DIALOG_CLOSES_ON_BACK, TuiDayOfWeek } from '@taiga-ui/cdk';
import { TUI_FIRST_DAY_OF_WEEK, TuiRoot, TuiAlert, TuiNotification, TuiCalendar, TuiDataList, TuiError, TuiScrollbar, TuiScrollable, TuiIcon, TuiDialog, TuiButton } from '@taiga-ui/core';
import { TuiDataListWrapper, TuiAccordion, TuiFieldErrorPipe, TuiFieldErrorContentPipe } from '@taiga-ui/kit';
import { of } from 'rxjs';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TuiRoot,
    TuiDialog,
    TuiAlert,
    TuiInputModule,
    TuiError,
    TuiFieldErrorPipe, TuiFieldErrorContentPipe,
    TuiButton,
    ...TuiAccordion,
    TuiScrollbar, TuiScrollable,
    TuiCalendar,
    TuiIcon,
    TuiMultiSelectModule,
    ...TuiDataList,
    ...TuiDataListWrapper,
    TuiTextfieldControllerModule,
    TuiNotification
  ],
  providers: [
    {
      provide: TUI_DIALOG_CLOSES_ON_BACK,
      useValue: of(true),
    },
    {
      provide: TUI_FIRST_DAY_OF_WEEK,
      useValue: TuiDayOfWeek.Monday
    },
      NG_EVENT_PLUGINS
],
  exports: [
    CommonModule,
    TuiRoot,
    TuiDialog,
    TuiAlert,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiError,
    TuiFieldErrorPipe, TuiFieldErrorContentPipe,
    TuiButton,
    ...TuiAccordion,
    TuiDialog,
    TuiScrollbar, TuiScrollable,
    TuiCalendar,
    TuiIcon,
    TuiMultiSelectModule,
    ...TuiDataList,
    ...TuiDataListWrapper,
    TuiNotification
  ],
})
export class TaigaModule {}
