import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaigaModule } from '../taiga/taiga.module';
import { SchedulerRoutingModule } from './scheduler-routing.module';
import { SchedulerComponent } from '../../pages/scheduler/scheduler.component';
import { TrainingCalendarListComponent } from 'src/app/components/training-calendar-list/training-calendar-list.component';
import { LoaderModule } from "../../components/loader/loader.module";



@NgModule({
  declarations: [SchedulerComponent, TrainingCalendarListComponent],
  imports: [
    CommonModule,
    SchedulerRoutingModule,
    TaigaModule,
    LoaderModule
],
})
export class SchedulerModule { }
