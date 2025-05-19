import { ChangeDetectionStrategy, Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { clientExercisesSelector } from '../../store/selectors/client-exercises.selector';
import { take } from 'rxjs';
import IClientExercise from '../../interfaces/client_exercise';
import { TuiComboBoxModule, TuiSelectModule, TuiTextareaModule } from '@taiga-ui/legacy';
import { ControlContainer, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe, NgIf } from '@angular/common';
import {TuiTextfield} from '@taiga-ui/core';
import {
  TuiDataListWrapperComponent,
  TuiFilterByInputPipe,
  TuiInputNumber,
  tuiItemsHandlersProvider
} from '@taiga-ui/kit';
import { TuiDataList, TuiLabel, TuiTextfieldComponent, TuiTextfieldOptionsDirective } from '@taiga-ui/core';

@Component({
  selector: 'app-training-exercise-item',
  templateUrl: './training-exercise-item.component.html',
  styleUrls: ['./training-exercise-item.component.scss'],
  imports: [
    TuiComboBoxModule,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    TuiDataListWrapperComponent,
    TuiDataList,
    JsonPipe,
    TuiFilterByInputPipe,
    TuiSelectModule,
    TuiInputNumber,
    TuiTextfieldComponent,
    TuiLabel,
    TuiTextfieldOptionsDirective,
    TuiTextfield,
    TuiTextareaModule
  ],
  standalone: true,
  providers: [
    // обработчик отображения элемента в tui-select наименования Упражнения
    tuiItemsHandlersProvider({
      stringify: (item: IClientExercise) => item.exercise_fullname as string
    })
  ],
  viewProviders: [
    // {
    //   provide: ControlContainer,
    //   useFactory: () => inject(ControlContainer, {skipSelf: true})
    // }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TrainingExerciseItemComponent implements OnChanges {
  @Input({ required: true })
  index!: number;
  exec_vars: IClientExercise[] = [];
  store = inject(Store);
  exForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private controlContainer: ControlContainer
  ) {
    this.store.select(clientExercisesSelector)
      .pipe(take(1))
      // Не обязательно каждый раз перечитывать упражнения.
      // Поскольку редактировать упражнения и тренировки будет один человек
      .subscribe(val => {
        this.exec_vars = val;
      });
  }

  ngOnInit(): void {
    let exercisesFormArray: FormArray<any> = this.controlContainer.control?.get('exercises') as FormArray;
    this.exForm = exercisesFormArray.at(this.index) as FormGroup;
  }

  ngOnChanges(changes: SimpleChanges): void {

  }
}


