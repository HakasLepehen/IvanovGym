import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TuiRootModule, TuiDialogModule, TuiAlertModule } from '@taiga-ui/core';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
  ],
  exports: [TuiRootModule]
})
export class TaigaModule { }
