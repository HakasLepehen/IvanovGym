import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaigaModule } from '../taiga/taiga.module';
import { SchedulerRoutingModule } from './scheduler-routing.module';
import { SchedulerComponent } from '../../pages/scheduler/scheduler.component';
import { TrainingCalendarListComponent } from 'src/app/components/training-calendar-list/training-calendar-list.component';



@NgModule({
  declarations: [SchedulerComponent, TrainingCalendarListComponent],
  imports: [
    CommonModule,
    SchedulerRoutingModule,
    TaigaModule,
  ],
})
export class SchedulerModule { }
