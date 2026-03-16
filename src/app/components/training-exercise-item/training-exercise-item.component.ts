import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  signal,
  SimpleChanges,
  WritableSignal,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { clientExercisesSelector } from '../../store/selectors/client-exercises.selector';
import { BehaviorSubject, map, of, take } from 'rxjs';
import { TuiComboBoxModule, TuiSelectModule, TuiTextareaModule } from '@taiga-ui/legacy';
import { ControlContainer, FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TuiButton, TuiDataList,
  TuiDataListDirective,
  TuiLabel,
  TuiTextfield,
  TuiTextfieldComponent,
  TuiLink
} from '@taiga-ui/core';
import {
  TuiButtonLoading,
  TuiChevron, TuiDataListWrapper,
  TuiFilterByInputPipe,
  tuiItemsHandlersProvider, TuiStringifyContentPipe
} from '@taiga-ui/kit';
import { BodyParts } from '../../enums/body-parts';
import { tap } from 'rxjs/internal/operators/tap';
import { LoaderService } from '../loader/loader.service';
import { AsyncPipe, CommonModule, JsonPipe } from '@angular/common';
import { IExercise } from '../../interfaces/exercise';
import { ISelectBox } from '../../interfaces/selectbox';
import { OutputMessage } from 'src/app/interfaces/output-message';
import { MessageTypes } from 'src/app/enums/message-types';
import { SchedulerConfigService } from '../scheduler/scheduler-config.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-training-exercise-item',
  templateUrl: './training-exercise-item.component.html',
  styleUrls: ['./training-exercise-item.component.scss'],
  imports: [
    CommonModule,
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
    JsonPipe,
    RouterLink,
    TuiLink,
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
  @Input({ required: false }) clientGUID!: string;
  @Output() messageSent = new EventEmitter<OutputMessage>(); // EventEmitter для отправки данных
  exercises: IExercise[] = [];
  version = 'test';
  store = inject(Store);
  selectedExecVar!: number | IExercise;
  exerciseData: WritableSignal<{name: string, url: string} | null> = signal(null);
  exForm!: FormGroup;
  body_parts!: string[];
  public isLoading$: BehaviorSubject<boolean>;
  protected searchingExercise: string = '';

  protected readonly stringify = (item: IExercise): string => `${item.name}`;

  constructor(
    private fb: FormBuilder,
    private controlContainer: ControlContainer,
    private loaderService: LoaderService,
    private scheduleConfigService: SchedulerConfigService
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
    const result = this.exercises.find((el: IExercise) => el.id === this.exForm.get('exercise')?.value);
    if (result) {
      this.selectedExecVar = result;
      this.exForm.get('exercise')?.setValue(this.selectedExecVar);
      this.exerciseData.set({
        name: this.exForm.get('exercise')?.value.name,
        url: this.exForm.get('exercise')?.value.url
      });
    }
  }

  ngOnChanges(changes: SimpleChanges): void {}

  get hasSelectedExercise(): boolean {
    return !!this.exForm.get('exercise')?.value;
  }

  removeExercise(): void {
    this.messageSent.emit({
      id: this.exForm.get('id')?.value,
      index: this.index,
      type: MessageTypes.REMOVE_ITEM,
    });
  }

  focusExerciseChanged(e: boolean): void {
    if (!e) {
      const selectedExercise: IExercise = this.exForm.get('exercise')?.value;
      if (!!selectedExercise) {
        this.messageSent.emit({
          id: selectedExercise.id as number,
          index: this.index,
          type: MessageTypes.PRELOAD_DATA,
        });
      }
    }
  }

  selectExercise(): void {
    this.scheduleConfigService.openExercisesList();
  }
}
