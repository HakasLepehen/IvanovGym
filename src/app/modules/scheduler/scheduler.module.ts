import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaigaModule } from '../taiga/taiga.module';
import { SchedulerRoutingModule } from './scheduler-routing.module';
import { TuiCalendarModule } from '@taiga-ui/core';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SchedulerRoutingModule,
    TaigaModule,
    TuiCalendarModule
  ]
})
export class SchedulerModule { }
