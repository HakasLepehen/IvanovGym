import { TuiButton, TuiDialogContext, TuiScrollbar } from "@taiga-ui/core";
import { TuiAccordion, TuiRadioList } from "@taiga-ui/kit";
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, Inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject, of, take, takeLast, takeUntil, tap } from 'rxjs';
import { ExercisesConfigService } from '../exercises-main/exercises-config.service';
import { IExercise } from './../../interfaces/exercise';
import { ExercisesFormModule } from '../exercises-form/exercises-form.module';
import { Store } from '@ngrx/store';
import IExercisesListDialog from "src/app/interfaces/exercises_list-dialog";
import { POLYMORPHEUS_CONTEXT } from "@taiga-ui/polymorpheus";
import { clientExercisesSelector } from "src/app/store/selectors/client-exercises.selector";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { SearchComponent } from "../ui/search/search.component";
import { BodyParts } from "src/app/enums/body-parts";
import { ISelectBox } from "src/app/interfaces/selectbox";
import { SchedulerConfigService } from "../scheduler/scheduler-config.service";

@Component({
  selector: 'app-exercises-list',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ExercisesFormModule,
    TuiButton,
    TuiRadioList,
    SearchComponent,
    TuiScrollbar
  ],
  standalone: true,
  templateUrl: './exercises-list.component.html',
  styleUrls: ['./exercises-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExercisesListComponent {
  public title: string = '';
  public selectedExercise: IExercise | undefined;
  private unsubscribe$: Subject<void> = new Subject();
  list: any[] = [];
  private bodyPartId!: number;
  public modeView: 'Default' | 'Scheduler' = 'Default';
  exListForm!: FormGroup;
  readOnlySubmit: WritableSignal<boolean> = signal(true);

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<boolean, IExercisesListDialog>,
    private route: ActivatedRoute,
    private exerciseConfigService: ExercisesConfigService,
    private schedulerConfigService: SchedulerConfigService,
    private store: Store<{ exercise: {} }>
  ) { }

  ngOnInit() {
    this.route.params
      .pipe(
        tap(params => {
          this.initView(params);
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe()
  }

  get exercises(): BehaviorSubject<IExercise[]> {
    return this.exerciseConfigService.exercises;
  }

  initView(params: any): void {
    this.exListForm = new FormGroup({
      exercise: new FormControl(null, Validators.required)
    });

    this.exListForm.valueChanges.subscribe(values => {
      this.readOnlySubmit.set(!this.exListForm.valid)
    });

    this.store.select(clientExercisesSelector)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe({
        next: (exercises) => {
          if (!this.context.data) {
            let filteredExercises: IExercise[] = []

            this.modeView = 'Default';
            this.bodyPartId = parseInt(params['part']);
            this.title = (<any>this.exerciseConfigService.bodyParts.find(el => el.id == params['part']))?.name ?? '';
            if (exercises.length) {
              filteredExercises = exercises.filter(
                (exercise: IExercise) => exercise.muscle_group == this.bodyPartId
              )

              this.exercises.next(filteredExercises);
            }
          } else {
            this.modeView = 'Scheduler';
            this.exListForm.get('exercise')?.patchValue(this.context.data.exercise)
            this.list = [...exercises];
          }
          this.list = exercises;
        },
      })
  }

  editExercise(model: IExercise) {
    this.exerciseConfigService.openModal(model, true);
  }

  deleteExercise(model: IExercise) {
    this.exerciseConfigService.deleteExercise(model)
  }

  searchOn({ query, body_parts }: { query: string, body_parts: string[] }): void {
    let bodyPartIds: number[] = [];
    let filteredExercises: IExercise[] = [];
    this.store.select(clientExercisesSelector)
      .pipe(
        take(1)
      )
      .subscribe({
        next: (exercises) => {
          // Collecting muscle group identifiers to filter by
          if (body_parts?.length) {
            body_parts.forEach((el: string) => {
              const item: ISelectBox | undefined = BodyParts.find(item => item.name === el);
              !!item ? bodyPartIds.push(item.id) : null;
            })
            bodyPartIds.forEach(id => {
              const filteredExerciseByBodyPart: IExercise[] = exercises.filter((exercise: IExercise) => exercise.muscle_group === id)
              filteredExercises = [...filteredExercises, ...filteredExerciseByBodyPart];
            })
            this.list = filteredExercises;

            this.list = this.exerciseConfigService.searchByIdentifiers(this.list, query)
          } else {
            this.list = this.exerciseConfigService.searchByIdentifiers(exercises, query)
          }

        }
      })
  }

  onSubmit(): void {
    // this.schedulerConfigService.closeExercisesListPopup();
    this.exerciseConfigService.setSelectedExercise(this.exListForm.controls['exercise'].value, this.context?.data?.index);
    // In this case context is not null. Now we are closing dialog
    this.context.completeWith(true);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.exerciseConfigService.destroy$.next(true);
  }
}
