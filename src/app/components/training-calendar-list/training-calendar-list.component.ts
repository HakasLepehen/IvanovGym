import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, DoCheck, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TUI_DEFAULT_MATCHER, TuiDay } from '@taiga-ui/cdk';
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
  public timeline: string[] = TIMELINES;
  public content: ITraining[] = [
    {
      clientGIUD: '123',
      day: 0,
      month: 0,
      year: 0,
      trainingExercises: []
    }
  ];

  constructor(private _hostElement: ElementRef) {
    console.log('constructor started: ', _hostElement.nativeElement);
  }
  ngAfterContentInit(): void {
    console.log('constructor started: ', this._hostElement.nativeElement);
  }
  ngAfterViewInit(): void {
    console.log('constructor started: ', this._hostElement.nativeElement);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges started');
  }

  ngOnInit() {
    console.log(this.selectedDay);
  }
}
