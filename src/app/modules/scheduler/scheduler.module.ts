import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaigaModule } from '../taiga/taiga.module';
import { SchedulerRoutingModule } from './scheduler-routing.module';
import { SchedulerComponent } from '../../pages/scheduler/scheduler.component';
import { TrainingCalendarListComponent } from 'src/app/components/training-calendar-list/training-calendar-list.component';
import { LoaderModule } from "../../components/loader/loader.module";
import { SchedulerConfigService } from 'src/app/components/scheduler/scheduler-config.service';
import { SortByTimePipe } from '../../pipes/sort-by-time/sort-by-time.pipe';
import { TransformMinutesPipe } from '../../pipes/transform-minutes/transform-minutes.pipe';
import { ClientsFilterComponent } from 'src/app/components/clients-filter/clients-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiCalendar, TuiGroup } from '@taiga-ui/core';
import { TuiBlock, TuiRadio, TuiRadioComponent } from '@taiga-ui/kit';

@NgModule({
  declarations: [SchedulerComponent, TrainingCalendarListComponent, ClientsFilterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SchedulerRoutingModule,
    TaigaModule,
    LoaderModule,
    SortByTimePipe,
    TransformMinutesPipe,
    TuiBlock, TuiGroup,
  ],
  providers: [SchedulerConfigService]
})
export class SchedulerModule { }
