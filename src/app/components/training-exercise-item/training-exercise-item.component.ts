import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { clientExercisesSelector } from '../../store/selectors/client-exercises.selector';
import { take } from 'rxjs';
import IClientExercise from '../../interfaces/client_exercise';

@Component({
  selector: 'app-training-exercise-item',
  templateUrl: './training-exercise-item.component.html',
  styleUrls: ['./training-exercise-item.component.scss'],
  standalone: true
})
export class TrainingExerciseItemComponent {
  exec_vars!: IClientExercise[];
  store= inject(Store)

  constructor() {
    this.store.select(clientExercisesSelector)
      .pipe(take(1))
      // Не обязательно каждый раз перечитывать упражнения.
      // Поскольку редактировать упражнения и тренировки будет один человек
      .subscribe(val => this.exec_vars = val);
  }

  ngOnInit(): void {

  }
}
