import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef, EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { Store } from '@ngrx/store';
import { clientExercisesSelector } from '../../store/selectors/client-exercises.selector';
import { take } from 'rxjs';
import IClientExercise from '../../interfaces/client_exercise';
import { TuiComboBoxModule, TuiSelectModule, TuiTextareaModule } from '@taiga-ui/legacy';
import { ControlContainer, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiButton, TuiDataListDirective, TuiTextfield } from '@taiga-ui/core';
import {
  TuiDataListWrapperComponent,
  TuiInputNumber,
  tuiItemsHandlersProvider
} from '@taiga-ui/kit';
import { TuiLabel, TuiTextfieldComponent } from '@taiga-ui/core';

@Component({
  selector: 'app-training-exercise-item',
  templateUrl: './training-exercise-item.component.html',
  styleUrls: ['./training-exercise-item.component.scss'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TuiComboBoxModule,
    TuiDataListWrapperComponent,
    TuiInputNumber,
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
  viewProviders: [
    // {
    //   provide: ControlContainer,
    //   useFactory: () => inject(ControlContainer, {skipSelf: true})
    // }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingExerciseItemComponent implements OnChanges {
  @Input({ required: true }) index!: number;
  @Output() messageSent = new EventEmitter<number>(); // EventEmitter для отправки данных
  exec_vars: IClientExercise[] = [];
  store = inject(Store);
  selectedExecVar: any;
  exForm!: FormGroup;

  constructor(private fb: FormBuilder, private controlContainer: ControlContainer) {
    this.store
      .select(clientExercisesSelector)
      .pipe(take(1))
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
    this.selectedExecVar = this.exec_vars.find((el: IClientExercise) => el.id === this.exForm.get('exercise')?.value);
    this.exForm.get('exercise')?.setValue(this.selectedExecVar);
  }

  ngOnChanges(changes: SimpleChanges): void {}

  removeExercise(): void {
    this.messageSent.emit(this.index)
  }
}


