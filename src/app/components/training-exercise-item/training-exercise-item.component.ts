import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { clientExercisesSelector } from '../../store/selectors/client-exercises.selector';
import { take } from 'rxjs';
import IClientExercise from '../../interfaces/client_exercise';
import { ITrainingExercise } from '../../interfaces/training_exercise';
import { TuiComboBoxModule } from '@taiga-ui/legacy';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe, NgIf } from '@angular/common';
import { TuiDataListWrapperComponent, TuiFilterByInputPipe, tuiItemsHandlersProvider } from '@taiga-ui/kit';
import { TuiDataList } from '@taiga-ui/core';

@Component({
  selector: 'app-training-exercise-item',
  templateUrl: './training-exercise-item.component.html',
  styleUrls: [ './training-exercise-item.component.scss' ],
  imports: [
    TuiComboBoxModule,
    ReactiveFormsModule,
    NgIf,
    TuiDataListWrapperComponent,
    TuiDataList,
    JsonPipe,
    TuiFilterByInputPipe,
  ],
  standalone: true,
  providers: [
    // обработчик отображения элемента в tui-select наименования Упражнения
    tuiItemsHandlersProvider({
      stringify: (item: IClientExercise) => item.exercise_fullname as string
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TrainingExerciseItemComponent implements OnChanges {
  @Input({required: true})
  exercise!: ITrainingExercise;
  exec_vars!: IClientExercise[];
  store= inject(Store);
  exForm!: FormGroup;

  constructor(private fb: FormBuilder,) {
    this.store.select(clientExercisesSelector)
      .pipe(take(1))
      // Не обязательно каждый раз перечитывать упражнения.
      // Поскольку редактировать упражнения и тренировки будет один человек
      .subscribe(val => {
        this.exec_vars = val
      });
  }

  ngOnInit(): void {
    this.exForm = this.fb.group({
      id: [this.exercise.id],
      exec_variant: [this.exercise.exec_var_id, Validators.required],
      execution_number: [this.exercise.execution_number],
      payload_weight: [this.exercise.payload_weight],
      comment: [this.exercise.comment]
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    
  }
}


