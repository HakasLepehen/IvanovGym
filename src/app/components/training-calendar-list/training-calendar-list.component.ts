import { Component } from '@angular/core';
import { ITraining } from 'src/app/interfaces/training';

@Component({
  selector: 'app-training-calendar-list',
  templateUrl: './training-calendar-list.component.html',
  styleUrls: ['./training-calendar-list.component.scss']
})
export class TrainingCalendarListComponent {
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

}
