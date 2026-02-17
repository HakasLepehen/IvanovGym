import { TuiButton } from "@taiga-ui/core";
import { TuiAccordion } from "@taiga-ui/kit";
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, of, takeUntil, tap } from 'rxjs';
import { ExercisesConfigService } from '../exercises-main/exercises-config.service';
import { IExercise } from './../../interfaces/exercise';
import { ExercisesFormModule } from '../exercises-form/exercises-form.module';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-exercises-list',
  imports: [CommonModule, ExercisesFormModule, TuiButton],
  standalone: true,
  templateUrl: './exercises-list.component.html',
  styleUrls: ['./exercises-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class ExercisesListComponent {
  public title: string = '';
  public selectedExercise: IExercise | undefined;
  private unsubscribe$: Subject<void> = new Subject();
  private bodyPartId!: number;

  constructor(
    private route: ActivatedRoute,
    private exerciseConfigService: ExercisesConfigService,
    private store: Store<{ exercise: {} }>
  ) { }

  ngOnInit() {
    this.route.params
      .pipe(
        tap(params => {
          this.bodyPartId = parseInt(params['part']);

          if (isNaN(this.bodyPartId)) {
            this.exercises.next([]);
            return alert('Поступил некорректный идентификатор группы мышц, обратитесь к разработчику');
          }

          this.title = (<any>this.exerciseConfigService.bodyParts.find(el => el.id == params['part'])).name;
          this.exerciseConfigService.loadExercisesByBodypart(this.bodyPartId);
          // return of();
        }),
        // не пойму зачем я это делал
        // tap(() => {
        //   this.store.select('exercises').subscribe((val) => {
        //     this.exerciseConfigService.loadExercisesByBodypart(this.bodyPartId)
        //   })
        // }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe()
  }

  get exercises(): Subject<IExercise[]> {
    return this.exerciseConfigService.exercises;
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
