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
import { BehaviorSubject, map, of, take } from 'rxjs';
import { TuiComboBoxModule, TuiSelectModule, TuiTextareaModule } from '@taiga-ui/legacy';
import { ControlContainer, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TuiButton,
  TuiDataListDirective,
  TuiLabel,
  TuiTextfield,
  TuiTextfieldComponent
} from '@taiga-ui/core';
import { TuiButtonLoading, TuiDataListWrapperComponent, tuiItemsHandlersProvider } from '@taiga-ui/kit';
import { BodyParts } from '../../enums/body_parts';
import { tap } from 'rxjs/internal/operators/tap';
import { LoaderService } from '../loader/loader.service';
import { AsyncPipe } from '@angular/common';
import { IExercise } from '../../interfaces/exercise';

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
    TuiButtonLoading,
    AsyncPipe
  ],
  standalone: true,
  providers: [
    // обработчик отображения элемента в tui-select наименования Упражнения
    tuiItemsHandlersProvider({
      stringify: (item: IExercise) => item.name as string,
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingExerciseItemComponent implements OnChanges {
  @Input({ required: true }) index!: number;
  @Output() messageSent = new EventEmitter<{ id: number | string; index: number }>(); // EventEmitter для отправки данных
  exec_vars: IExercise[][] = [];
  store = inject(Store);
  selectedExecVar: any;
  exForm!: FormGroup;
  body_parts!: string[];
  public isLoading$: BehaviorSubject<boolean>;

  constructor(
    private fb: FormBuilder,
    private controlContainer: ControlContainer,
    private loaderService: LoaderService,
  ) {
    this.isLoading$ = loaderService.getLoading();
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
          const result: IExercise[][] = new Array(BodyParts.length);
          exercises.forEach((exercise: IExercise, index: number) => {
            if (!result[exercise.muscle_group as number]) {
              result[exercise.muscle_group as number] = [];
            }
            result[exercise.muscle_group as number].push(exercise)
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
      .find((el: IExercise) => el.id === this.exForm.get('exercise')?.value);
    this.exForm.get('exercise')?.setValue(this.selectedExecVar);
  }

  ngOnChanges(changes: SimpleChanges): void {}

  removeExercise(): void {
    this.messageSent.emit({ id: this.exForm.get('id')?.value, index: this.index });
  }
}
