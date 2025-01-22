import { ITraining } from './../../interfaces/training';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  SimpleChanges
} from '@angular/core';
import { TuiDay} from '@taiga-ui/cdk';
import { SchedulerConfigService } from '../scheduler/scheduler-config.service';

@Component({
  selector: 'app-training-calendar-list',
  templateUrl: './training-calendar-list.component.html',
  styleUrls: ['./training-calendar-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingCalendarListComponent {
  @Input()
  public selectedDay: TuiDay | null = null;
  @Input()
  public plannedTrainings!: ITraining[];

  constructor(private _schedulerConfigService: SchedulerConfigService,) {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  public removeTraining(training: ITraining): void {
    this._schedulerConfigService.removeTraining(training.id as number)
  }

  ngOnInit() {
    console.log(this.selectedDay);
  }
}
