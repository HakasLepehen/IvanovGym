import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaigaModule } from '../taiga/taiga.module';
import { SchedulerRoutingModule } from './scheduler-routing.module';
import { TuiCalendarModule } from '@taiga-ui/core';
import { SchedulerComponent } from 'src/app/components/scheduler/scheduler.component';



@NgModule({
  declarations: [SchedulerComponent],
  imports: [
    CommonModule,
    SchedulerRoutingModule,
    TaigaModule,
  ],
})
export class SchedulerModule { }
