import {
  AfterContentInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { TuiDay, TuiTime } from '@taiga-ui/cdk';
import { ITraining } from 'src/app/interfaces/training';
import { TIMELINES } from './timeline';
import { SchedulerConfigService } from "../scheduler/scheduler-config.service";

@Component({
  selector: 'app-training-calendar-list',
  templateUrl: './training-calendar-list.component.html',
  styleUrls: ['./training-calendar-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingCalendarListComponent implements OnInit, OnChanges, AfterViewInit, AfterContentInit {
  @Input()
  public selectedDay: TuiDay | null = null;
  public timeline: Array<string | TuiTime> = TIMELINES;
  private needToReloadTrainings: boolean = false;
  public content: ITraining[] = [
    {
      clientGIUD: '123',
      day: 0,
      month: 0,
      year: 0,
      trainingExercises: []
    }
  ];

  constructor(public schedulerConfigService: SchedulerConfigService) {
    // this.schedulerConfigService = inject(SchedulerConfigService);
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit started: ');
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit started: ');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges started', changes);
    this.schedulerConfigService.getTrainings()
  }

  ngOnInit() {
    console.log(this.selectedDay);
  }
}
