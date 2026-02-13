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
import { BehaviorSubject, map, of, Subject, take } from 'rxjs';
import { TuiComboBoxComponent, TuiComboBoxModule, TuiSelectModule, TuiTextareaModule } from '@taiga-ui/legacy';
import { ControlContainer, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TuiButton, TuiDataList,
  TuiDataListDirective,
  TuiLabel,
  TuiTextfield,
  TuiTextfieldComponent
} from '@taiga-ui/core';
import {
  TuiButtonLoading,
  TuiChevron, TuiDataListWrapper,
  TuiDataListWrapperComponent,
  TuiFilterByInputPipe,
  tuiItemsHandlersProvider, TuiStringifyContentPipe
} from '@taiga-ui/kit';
import { BodyParts } from '../../enums/body_parts';
import { tap } from 'rxjs/internal/operators/tap';
import { LoaderService } from '../loader/loader.service';
import { AsyncPipe } from '@angular/common';
import { IExercise } from '../../interfaces/exercise';
import { TuiFilterPipe } from '@taiga-ui/cdk';
import { ISelectBox } from '../../interfaces/selectbox';

@Component({
  selector: 'app-training-exercise-item',
  templateUrl: './training-exercise-item.component.html',
  styleUrls: ['./training-exercise-item.component.scss'],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TuiComboBoxModule,
    TuiDataList,
    TuiDataListWrapper,
    TuiTextfieldComponent,
    TuiLabel,
    TuiTextfield,
    TuiTextareaModule,
    TuiDataListDirective,
    TuiSelectModule,
    TuiButton,
    TuiButtonLoading,
    AsyncPipe,
    TuiChevron,
    TuiFilterByInputPipe,
    TuiStringifyContentPipe,
  ],
  standalone: true,
  providers: [
    // обработчик отображения элемента в tui-select наименования Упражнения
    tuiItemsHandlersProvider({
      stringify: (val: ISelectBox | number) => {
        if (typeof val === 'number') {
          const body_part = BodyParts.find((part: ISelectBox) => part.id === val) as ISelectBox;
          return body_part.name;
        }
        return val.name as string;
      },
    }),
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingExerciseItemComponent implements OnChanges {
  @Input({ required: true }) index!: number;
  @Output() messageSent = new EventEmitter<{ id: number | string; index: number }>(); // EventEmitter для отправки данных
  exercises: IExercise[] = [];
  store = inject(Store);
  selectedExecVar: any;
  exForm!: FormGroup;
  body_parts!: string[];
  public isLoading$: BehaviorSubject<boolean>;
  protected searchingExercise: string = '';

  protected readonly stringify = (item: IExercise): string => `${item.name}`;

  constructor(
    private fb: FormBuilder,
    private controlContainer: ControlContainer,
    private loaderService: LoaderService
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
        tap((response: IExercise[]) => (this.exercises = response))
      )
      .subscribe();
  }

  ngOnInit(): void {
    let exercisesFormArray: FormArray<any> = this.controlContainer.control?.get('exercises') as FormArray;
    this.exForm = exercisesFormArray.at(this.index) as FormGroup;
    // инициализация поля выбора упражнения через поиск
    const result = this.exercises.find((el: IExercise) => {
      if (el.id === this.exForm.get('exercise')?.value) {
        return el
      }
      return el;
    });
    this.selectedExecVar = result;
    this.exForm.get('exercise')?.setValue(this.selectedExecVar);
  }

  ngOnChanges(changes: SimpleChanges): void {}

  removeExercise(): void {
    this.messageSent.emit({ id: this.exForm.get('id')?.value, index: this.index });
  }
}
