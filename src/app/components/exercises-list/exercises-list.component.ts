import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TuiAccordionModule } from '@taiga-ui/kit';
import { Subject, takeUntil, tap } from 'rxjs';
import { ExercisesConfigService } from '../exercises-main/exercises-config.service';
import { IExercise } from './../../interfaces/exercise';
import { ExercisesFormModule } from '../exercises-form/exercises-form.module';

@Component({
  selector: 'app-exercises-list',
  imports: [CommonModule, TuiAccordionModule, ExercisesFormModule],
  standalone: true,
  templateUrl: './exercises-list.component.html',
})
export class ExercisesListComponent {
  public title: string = '';

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private route: ActivatedRoute,
    private exerciseConfigService: ExercisesConfigService
  ) { }

  ngOnInit() {
    this.route.params
      .pipe(
        tap(params => {
          const bodyPartId = parseInt(params['part']);

          if (isNaN(bodyPartId)) {
            this.exercises.next([]);
            return alert('Поступил некорректный идентификатор группы мышц, обратитесь к разработчику');
          }

          this.title = this.exerciseConfigService.bodyParts.filter(el => el.id == params['part'])[0].name;
          this.exerciseConfigService.loadExercises(bodyPartId);
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe()
  }

  get exercises(): Subject<IExercise[]> {
    return this.exerciseConfigService.exercises;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
  }
}