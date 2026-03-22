import { TuiButton, TuiDialogContext, TuiScrollbar } from "@taiga-ui/core";
import { TuiAccordion, TuiRadioList } from "@taiga-ui/kit";
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, of, take, takeUntil, tap } from 'rxjs';
import { ExercisesConfigService } from '../exercises-main/exercises-config.service';
import { IExercise } from './../../interfaces/exercise';
import { ExercisesFormModule } from '../exercises-form/exercises-form.module';
import { Store } from '@ngrx/store';
import IExercisesListDialog from "src/app/interfaces/exercises_list-dialog";
import { POLYMORPHEUS_CONTEXT } from "@taiga-ui/polymorpheus";
import { clientExercisesSelector } from "src/app/store/selectors/client-exercises.selector";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { SearchComponent } from "../ui/search/search.component";

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
  changeDetection: ChangeDetectionStrategy.Default
})
export class ExercisesListComponent {
  public title: string = '';
  public selectedExercise: IExercise | undefined;
  private unsubscribe$: Subject<void> = new Subject();
  list: any[] = [];
  private bodyPartId!: number;
  public modeView: 'Default' | 'Scheduler' = 'Default';
  exListForm!: FormGroup;

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<boolean, IExercisesListDialog>,
    private route: ActivatedRoute,
    private exerciseConfigService: ExercisesConfigService,
    private store: Store<{ exercise: {} }>
  ) { }

  ngOnInit() {
    this.route.params
      .pipe(
        tap(params => {
          if (!this.context.data) {
            this.bodyPartId = parseInt(params['part']);

            if (isNaN(this.bodyPartId)) {
              this.exercises.next([]);
              return alert('Поступил некорректный идентификатор группы мышц, обратитесь к разработчику');
            }

            this.title = (<any>this.exerciseConfigService.bodyParts.find(el => el.id == params['part'])).name;
            this.exerciseConfigService.loadExercisesByBodypart(this.bodyPartId);
          } else {
            this.modeView = 'Scheduler';
            this.initScheduleView();
          }
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe()
  }

  get exercises(): Subject<IExercise[]> {
    return this.exerciseConfigService.exercises;
  }

  initScheduleView(): void {
    this.exListForm = new FormGroup({
      exercise: new FormControl(null, Validators.required)
    });
    this.store.select(clientExercisesSelector)
      .pipe(take(1))
      .subscribe({
        next: (exercises) => {
          console.log(exercises[0]);

          // this.list = [...exercises];
        },
      })
  }

  editExercise(model: IExercise) {
    this.exerciseConfigService.openModal(model, true);
  }

  deleteExercise(model: IExercise) {
    this.exerciseConfigService.deleteExercise(model)
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.exerciseConfigService.destroy$.next(true);
  }
}
