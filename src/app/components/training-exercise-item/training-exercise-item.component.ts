import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { clientExercisesSelector } from '../../store/selectors/client-exercises.selector';
import { take } from 'rxjs';
import IClientExercise from '../../interfaces/client_exercise';
import { ITrainingExercise } from '../../interfaces/training_exercise';
import { TuiSelectModule } from '@taiga-ui/legacy';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-training-exercise-item',
  templateUrl: './training-exercise-item.component.html',
  styleUrls: [ './training-exercise-item.component.scss' ],
  imports: [
    TuiSelectModule,
    ReactiveFormsModule,
    NgIf
  ],
  standalone: true
})
export class TrainingExerciseItemComponent {
  exec_vars!: IClientExercise[];
  exercise!: ITrainingExercise;
  store= inject(Store);
  exForm!: FormGroup;

  constructor(private fb: FormBuilder,) {
    this.exForm = this.fb.group({
      id: [null],
      exec_var_id: [null],
      execution_number: [0],
      payload_weight: [0],
      comment: ['']
    })
    this.store.select(clientExercisesSelector)
      .pipe(take(1))
      // Не обязательно каждый раз перечитывать упражнения.
      // Поскольку редактировать упражнения и тренировки будет один человек
      .subscribe(val => {
        this.exec_vars = val
      });
  }

  ngOnInit(): void {

  }
}
