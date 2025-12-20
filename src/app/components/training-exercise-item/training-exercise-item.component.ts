import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { clientExercisesSelector } from '../../store/selectors/client-exercises.selector';
import { map, of, take } from 'rxjs';
import IClientExercise from '../../interfaces/client_exercise';
import { TuiComboBoxModule, TuiSelectModule, TuiTextareaModule } from '@taiga-ui/legacy';
import { ControlContainer, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TuiButton,
  TuiDataListDirective,
  TuiLabel,
  TuiTextfield,
  TuiTextfieldComponent
} from '@taiga-ui/core';
import { TuiDataListWrapperComponent, tuiItemsHandlersProvider } from '@taiga-ui/kit';
import { BodyParts } from '../../enums/body_parts';
import { tap } from 'rxjs/internal/operators/tap';

@Component({
  selector: 'app-training-exercise-item',
  templateUrl: './training-exercise-item.component.html',
  styleUrls: ['./training-exercise-item.component.scss'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TuiComboBoxModule,
    TuiTextfieldComponent,
    TuiLabel,
    TuiTextfield,
    TuiTextareaModule,
    TuiDataListDirective,
    TuiSelectModule,
    TuiButton,
  ],
  standalone: true,
  providers: [
    // обработчик отображения элемента в tui-select наименования Упражнения
    tuiItemsHandlersProvider({
      stringify: (item: IClientExercise) => item.exercise_fullname as string,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingExerciseItemComponent implements OnChanges {
  @Input({ required: true }) index!: number;
  @Output() messageSent = new EventEmitter<{ id: number | string; index: number }>(); // EventEmitter для отправки данных
  exec_vars: IClientExercise[][] = [];
  store = inject(Store);
  selectedExecVar: any;
  exForm!: FormGroup;
  body_parts!: string[];

  constructor(private fb: FormBuilder, private controlContainer: ControlContainer) {
    of(BodyParts)
      .pipe(
        take(1),
        map((body_parts) => body_parts.map((part) => part.name)),
        tap((result) => (this.body_parts = result))
      )
      .subscribe();
    this.store
      .select(clientExercisesSelector)
      .pipe(
        take(1),
        map((exercises) => {
          const result: IClientExercise[][] = new Array(BodyParts.length);
          exercises.forEach((exercise: IClientExercise, index: number) => {
            result[index] = [];
            exercise.body_part_ids?.forEach((id) => {
              if (!result[id]) result[id] = [];

              result[id].push(exercise);
            });
          });
          return result;
        })
      )
      // Не обязательно каждый раз перечитывать упражнения.
      // Поскольку редактировать упражнения и тренировки будет один человек
      .subscribe((val) => {
        this.exec_vars = val;
      });
  }

  ngOnInit(): void {
    let exercisesFormArray: FormArray<any> = this.controlContainer.control?.get('exercises') as FormArray;
    this.exForm = exercisesFormArray.at(this.index) as FormGroup;
    // инициализация поля выбора упражнения через поиск
    this.selectedExecVar = this.exec_vars
      .flat()
      .find((el: IClientExercise) => el.id === this.exForm.get('exercise')?.value);
    this.exForm.get('exercise')?.setValue(this.selectedExecVar);
  }

  ngOnChanges(changes: SimpleChanges): void {}

  removeExercise(): void {
    this.messageSent.emit({ id: this.exForm.get('id')?.value, index: this.index });
  }
}
