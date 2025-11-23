import { TuiFor } from "@taiga-ui/cdk";
import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';
import { TaigaModule } from '../taiga/taiga.module';
import { SchedulerRoutingModule } from './scheduler-routing.module';
import { SchedulerComponent } from '../../pages/scheduler/scheduler.component';
import { TrainingCalendarListComponent } from 'src/app/components/training-calendar-list/training-calendar-list.component';
import { LoaderModule } from "../../components/loader/loader.module";
import { SchedulerConfigService } from 'src/app/components/scheduler/scheduler-config.service';
import { TrainingExerciseListComponent } from "src/app/components/training-exercise-list/training-exercise-list.component";
import { SortByTimePipe } from '../../pipes/sort-by-time/sort-by-time.pipe';
import { TransformMinutesPipe } from '../../pipes/transform-minutes/transform-minutes.pipe';

@NgModule({
  declarations: [SchedulerComponent, TrainingCalendarListComponent],
  imports: [
    CommonModule,
    SchedulerRoutingModule,
    TaigaModule,
    LoaderModule,
    SortByTimePipe,
    TransformMinutesPipe
  ],
  providers: [SchedulerConfigService]
})
export class SchedulerModule { }
