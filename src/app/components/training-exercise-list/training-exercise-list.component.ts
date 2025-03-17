import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-training-exercise-list',
  templateUrl: './training-exercise-list.component.html',
  styleUrls: ['./training-exercise-list.component.scss'],
  standalone: true
})
export class TrainingExerciseListComponent implements OnChanges {
  @Input()
  exercises: any = [];

  ngOnInit(): void {
    console.log(this.exercises.controls);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['exercises'].currentValue);
    console.log(this.exercises);
  }
}
