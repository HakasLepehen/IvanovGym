import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, DoCheck, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TUI_DEFAULT_MATCHER, TuiDay, TuiTime } from '@taiga-ui/cdk';
import { Subject } from 'rxjs/internal/Subject';
import { map, startWith, switchMap } from 'rxjs/operators';
import { ITraining } from 'src/app/interfaces/training';
import { TIMELINES } from './timeline';

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
  public content: ITraining[] = [
    {
      clientGIUD: '123',
      day: 0,
      month: 0,
      year: 0,
      trainingExercises: []
    }
  ];

  constructor() {

  }
  ngAfterContentInit(): void {
    console.log('ngAfterContentInit started: ');
  }
  ngAfterViewInit(): void {
    console.log('ngAfterViewInit started: ');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges started', changes);
  }

  ngOnInit() {
    console.log(this.selectedDay);
  }
}
