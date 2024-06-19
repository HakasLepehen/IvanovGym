import { Component, Input } from '@angular/core';
import { TUI_DEFAULT_MATCHER, TuiDay } from '@taiga-ui/cdk';
import { Subject } from 'rxjs/internal/Subject';
import { map, startWith, switchMap } from 'rxjs/operators';
import { ITraining } from 'src/app/interfaces/training';

@Component({
  selector: 'app-training-calendar-list',
  templateUrl: './training-calendar-list.component.html',
  styleUrls: ['./training-calendar-list.component.scss']
})
export class TrainingCalendarListComponent {
  @Input()
  public selectedDay: TuiDay | null = null;
  public content: ITraining[] = [
    {
      clientGIUD: '123',
      day: 0,
      month: 0,
      year: 0,
      trainingExercises: []
    }
  ];

  constructor() {}

  ngOnInit() {
    console.log(this.selectedDay);
  }
}
