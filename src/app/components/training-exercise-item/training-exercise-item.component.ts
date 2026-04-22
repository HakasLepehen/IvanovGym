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
  tuiItemsHandlersProvider, TuiStringifyContentPipe,
  TuiTextarea
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
import { ExercisesConfigService } from '../exercises-main/exercises-config.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LinkComponent } from '../ui/link/link.component';

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
    TuiTextarea,
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
    LinkComponent,
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
export class TrainingExerciseItemComponent {
  @Input({ required: true }) index!: number;
  @Input({ required: false }) clientGUID!: string;
  @Output() messageSent = new EventEmitter<OutputMessage>(); // EventEmitter для отправки данных
  exercises: IExercise[] = [];
  store = inject(Store);
  selectedExecVar!: number | IExercise;
  exerciseData: WritableSignal<{ name: string, url: string } | null> = signal(null);
  exForm!: FormGroup;
  public isLoading$: BehaviorSubject<boolean>;
  linkText: string = '';
  linkURL: string = '';

  protected readonly stringify = (item: IExercise): string => `${item.name}`;

  constructor(
    private controlContainer: ControlContainer,
    private loaderService: LoaderService,
    private scheduleConfigService: SchedulerConfigService,
  ) {
    this.isLoading$ = loaderService.getLoading();
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
      this.focusExerciseChanged();
    }
    this.exForm.valueChanges.subscribe({
      next: (value) => {
        this.exerciseData.set({
          name: value.exercise.name,
          url: value.exercise.url,
        });
        this.linkText = value.exercise.name;
        this.linkURL = value.exercise.url
      },
    })
  }

  removeExercise(): void {
    this.messageSent.emit({
      id: this.exForm.get('id')?.value,
      index: this.index,
      type: MessageTypes.REMOVE_ITEM,
    });
  }

  focusExerciseChanged(): void {

    const selectedExercise: IExercise = this.exForm.get('exercise')?.value;
    if (!!selectedExercise) {
      this.messageSent.emit({
        id: selectedExercise.id as number,
        index: this.index,
        type: MessageTypes.PRELOAD_DATA,
      });
    }

  }

  selectExercise(): void {
    this.scheduleConfigService.openExercisesList(this.exForm.get('exercise')?.value, this.index);
  }
}
