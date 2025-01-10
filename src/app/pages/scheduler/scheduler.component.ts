import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TuiDay } from '@taiga-ui/cdk';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { SchedulerConfigService } from 'src/app/components/scheduler/scheduler-config.service';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchedulerComponent implements OnInit {
  public selectedDay: TuiDay | null = TuiDay.fromLocalNativeDate(new Date(Date.now()));
  public plannedTrainings:

  constructor(
    private _schedulerService: SchedulerConfigService,
  ) {
  }

  ngOnInit() {
  }

  public onDayClick(day: TuiDay | any): void {
    this.selectedDay = day;
    console.log(this.selectedDay);
  }

  public addTraining() {
    this._schedulerService.openModal(this.selectedDay as TuiDay);
  }
}