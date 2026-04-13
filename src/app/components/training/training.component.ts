import { IClient } from '../../interfaces/client';
import { ITrainingExercise } from '../../interfaces/training_exercise';
import { clientsSelector } from '../../store/selectors/client.selector';
import { SchedulerConfigService } from '../scheduler/scheduler-config.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, Inject, Input, OnDestroy, Optional, Signal, signal, ViewChild, ViewContainerRef, WritableSignal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { tuiAutoFocusOptionsProvider, TuiDay } from '@taiga-ui/cdk';
import { TuiButton, TuiDataList, TuiDialogContext, TuiScrollbar } from '@taiga-ui/core';
import { TuiButtonLoading, tuiCreateTimePeriods, TuiDataListWrapper, tuiItemsHandlersProvider } from '@taiga-ui/kit';
import { TuiInputDateModule, TuiInputTimeModule, TuiSelectModule } from '@taiga-ui/legacy';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { BehaviorSubject, EMPTY, filter, first, forkJoin, map, of, switchMap, take, tap } from 'rxjs';
import { ITrainingDialog } from '../../interfaces/training_dialog';
import { ITraining } from '../../interfaces/training';
import { LoaderService } from '../loader/loader.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { any } from 'cypress/types/bluebird';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TuiScrollbar,
    TuiButton,
    TuiInputTimeModule,
    TuiSelectModule,
    TuiDataList,
    TuiDataListWrapper,
    TuiInputDateModule,
    TuiButtonLoading,
  ],
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
  providers: [
    tuiItemsHandlersProvider({
      stringify: (client: IClient) => `${client.fullName}`
    }),
    tuiAutoFocusOptionsProvider({ preventScroll: true })
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TrainingComponent {
  @Input()
  trainingId!: number;
  public isCreate: boolean = false;
  private selectedDay!: TuiDay;
  public trainingForm!: FormGroup;
  public isLoading$: BehaviorSubject<boolean>;
  timeSlots = tuiCreateTimePeriods(11, 21);
  clients!: IClient[];
  public editingTraining!: ITraining;
  @ViewChild('place', { read: ViewContainerRef }) placeContainer!: ViewContainerRef;
  hasClients: WritableSignal<boolean> = signal(false);

  constructor(
    @Optional() @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<boolean, ITrainingDialog>,
    private store: Store,
    private scheduleConfigService: SchedulerConfigService,
    private fb: FormBuilder,
    private loaderService: LoaderService,
    private readonly activatedRoute: ActivatedRoute,
  ) {
    this.isLoading$ = loaderService.getLoading();
    this.isCreate = context.data != null;
    this.trainingForm = this.fb.group({
      id: new FormControl<number | null>(null),
      time: new FormControl<string | null>(null, Validators.required),
      planned_date: new FormControl<string | null>(null, Validators.required),
      client: new FormControl<IClient | null>(null, Validators.required),
      exercises: this.fb.array([])
    });
  }

  ngOnInit() {
    this.store.select(clientsSelector)
      .pipe(
        filter((clients: IClient[]) => clients.length > 0),
        tap((clients: IClient[]) => {
          this.clients = clients.filter(client => client.isActive && client.fullName?.trim());
          this.hasClients.set(true);
        }),
        switchMap(() => {
          return !this.isCreate ? this.scheduleConfigService.editingTraining$ : EMPTY
        }),
        switchMap((editingTraining: any): any => {
          // будет работать при первоначальной загрузке страницы редактирования тренировки
          if (editingTraining) {
            this.isCreate = false;
            return of(editingTraining);
          } else {
            // будет работать при перезагрузке страницы редактирования тренировки
            // можно получить новым потоком через события роутера но при такой реализации все работает корректно
            const strId = this.activatedRoute.snapshot.paramMap.get('id');
            const id = parseInt(strId as string);

            if (!isNaN(id)) {
              return this.scheduleConfigService.getTrainingById(id);
            }
          }
        }),
        filter((editingTraining): editingTraining is ITraining => {
          return editingTraining != null
        }),
        // not sure that need this operator, because i receive above editingTraining many times
        first(),
      )
      .subscribe({
        next: (editingTraining) => {
          this.editingTraining = editingTraining;
        },
        complete: () => {
          this.initView();
        }
      });
  }

  initView(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    // если нет id то было открыто диалоговое окно создания тренировки
    if (!id) {
      this.isCreate = this.context?.data?.isPlanning;
      this.selectedDay = this.context?.data?.selectedDay;
    }
    this.initializeForm();
  }

  private initializeForm(): void {
    if (!!this.editingTraining) {
      // если в контексте было получено значение - инициализируем данные в форме
      this.scheduleConfigService.initializeTrainingFormControls(this.trainingForm, this.editingTraining, this.clients);
      this.scheduleConfigService.getTrainingExercisesByTraining(this.editingTraining.id as number);
      this.scheduleConfigService.trainingExercises$
        .pipe(
          take(1),
          tap(val => {
            if (val.length) {
              val.forEach((trainingExercise: ITrainingExercise) => this.addExercise(trainingExercise));
            }
          })
        )
        .subscribe();
    }
  }

  get exercises(): FormArray<any> {
    return this.trainingForm.controls['exercises'] as FormArray;
  }

  identifyClient = (): any => {
    return true;
  };

  public onSubmit(): void {
    const props = {
      formValue: this.trainingForm.value,
      isCreate: this.isCreate
    };

    this.scheduleConfigService.saveTraining(props, this.context);
  }

  /**
   * добавляет компонент
   * @param exercise
   */
  public addExercise(exercise?: ITrainingExercise): void {
    this.scheduleConfigService.initializeExerciseComponent(this.placeContainer, this.exercises, this.editingTraining.clientGUID);

    this.exercises.push(
      new FormGroup({
        id: new FormControl(exercise?.id ?? null),
        training_id: new FormControl(this.editingTraining.id ?? null),
        exercise: new FormControl(exercise?.exercise_id ?? null, Validators.required),
        set_count: new FormControl(exercise?.set_count ?? '', Validators.required),
        execution_number: new FormControl(exercise?.execution_number ?? '', Validators.required),
        payload_weight: new FormControl(exercise?.payload_weight ?? '', Validators.required),
        comment: new FormControl(exercise?.comment ?? '')
      })
    );
  }
}
