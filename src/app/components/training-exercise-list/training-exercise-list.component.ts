import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-training-exercise-list',
  templateUrl: './training-exercise-list.component.html',
  styleUrls: ['./training-exercise-list.component.scss'],
  standalone: true
})
export class TrainingExerciseListComponent {
  @Input()
  exercises: any = [];

  ngOnInit(): void {
    console.log(this.exercises);
  }
}
