import { TuiInputDateModule, TuiInputTimeModule, TuiSelectModule } from '@taiga-ui/legacy';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ComponentRef, Inject, ViewChild, ViewContainerRef } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import {
  TuiButton,
  TuiDataList,
  TuiDialogContext,
  TuiError,
  TuiScrollable,
  TuiScrollbar,
  TuiTextfieldComponent
} from '@taiga-ui/core';
import { tuiCreateTimePeriods, TuiDataListWrapper, TuiFieldErrorPipe, tuiItemsHandlersProvider } from '@taiga-ui/kit';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { IClient } from '../../interfaces/client';
import { ITrainingDialog } from 'src/app/interfaces/training_dialog';
import { Store } from '@ngrx/store';
import { clientsSelector } from '../../store/selectors/client.selector';
import { take } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { TuiDay } from '@taiga-ui/cdk';
import { SchedulerConfigService } from '../scheduler/scheduler-config.service';
import { ITraining } from 'src/app/interfaces/training';
import { TrainingExerciseListComponent } from '../training-exercise-list/training-exercise-list.component';
import { ITrainingExercise } from '../../interfaces/training_exercise';
import { TrainingExerciseItemComponent } from '../training-exercise-item/training-exercise-item.component';

@Component({
  selector: 'app-training',
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
  ],
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
  providers: [
    tuiItemsHandlersProvider({
      stringify: (client: IClient) => `${client.fullName}`
    })
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TrainingComponent {
  public isPlanning: boolean = false;
  private selectedDay!: TuiDay;
  public trainingForm!: FormGroup;
  timeSlots = tuiCreateTimePeriods(11, 21);
  clients!: IClient[];
  public editingTraining!: ITraining;
  public trainingExercises: ITrainingExercise[] = [];
  @ViewChild('place', { read: ViewContainerRef }) placeContainer!: ViewContainerRef;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<boolean, ITrainingDialog>,
    private store: Store,
    private scheduleConfigService: SchedulerConfigService,
    private fb: FormBuilder
  ) {
    if (!!context?.data?.training) this.editingTraining = context.data.training;

    this.isPlanning = context?.data?.isPlanning;
    this.selectedDay = context?.data?.selectedDay;
    store.select(clientsSelector)
      .pipe(
        take(1),
        tap(val => this.clients = val)
      ).subscribe();
  }

  ngOnInit() {
    this.trainingForm = this.fb.group({
      time: new FormControl<string | null>(null, Validators.required),
      planned_date: new FormControl<string | null>(null, Validators.required),
      client: new FormControl<IClient | null>(null, Validators.required),
      exercises: this.fb.array([])
    });
    if (!!this.editingTraining) {
      // если в контексте было получено значение - инициализируем данные в форме
      this.scheduleConfigService.getTrainingExercisesByTraining(this.editingTraining.trainingExerciseIds ?? []);
      this.scheduleConfigService.trainingExercises$
        .pipe(
          take(1),
          tap(val => {
            val.forEach((trainingExercise: ITrainingExercise) => this.addExercise(trainingExercise));
          })
        )
        .subscribe();
      this.scheduleConfigService.initializeTrainingFormControls(this.trainingForm, this.editingTraining, this.clients);
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
      isCreate: this.isPlanning
    };

    console.log(this.trainingForm.value);
    this.scheduleConfigService.saveTraining(props, this.context);
  }

  public addExercise(exercise?: ITrainingExercise): void {
    const trainingExerciseComponentRef: ComponentRef<TrainingExerciseItemComponent> = this.placeContainer.createComponent<TrainingExerciseItemComponent>(TrainingExerciseItemComponent);

    trainingExerciseComponentRef.setInput('index', this.exercises.length);
    trainingExerciseComponentRef.instance.messageSent.subscribe(val => trainingExerciseComponentRef.destroy());

    this.exercises.push(
      new FormGroup({
        exercise: new FormControl(exercise?.exec_var_id ?? null, Validators.required),
        execution_number: new FormControl(exercise?.execution_number ?? 0, Validators.required),
        payload_weight: new FormControl(exercise?.payload_weight ?? 0, Validators.required),
        comment: new FormControl(exercise?.comment ?? ''),
      })
    );
  }
}
