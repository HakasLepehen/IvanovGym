import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  SimpleChanges
} from '@angular/core';
import { TuiDay} from '@taiga-ui/cdk';
import { SchedulerConfigService } from "../scheduler/scheduler-config.service";

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
  public plannedTrainings = [];

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit() {
    console.log(this.selectedDay);
  }
}
