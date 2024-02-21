import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, catchError, forkJoin, map, of, take, tap } from 'rxjs';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { IExecutionVariant } from 'src/app/interfaces/execution_variant';
import { IExerciseView } from '../../interfaces/exercise_view';
import { IExercise } from './../../interfaces/exercise';
import { ExercisesService } from './exercises.service';
import { ISelectBox } from 'src/app/interfaces/selectbox';
import { BodyParts } from 'src/app/enums/body_parts';

@Injectable({
  providedIn: 'root'
})
export class ExercisesConfigService {
  public exercises$: Subject<IExerciseView[]> = new Subject();
  private body_parts: ISelectBox[] = BodyParts;
  private savingId!: number;

  constructor(
    private loader: LoaderService,
    private exercisesService: ExercisesService
  ) {
    this.getExercises();
  }

  // тут руки тянутся в tap вызвать метод сохранения варианта выполнения
  createExercise(model: IExercise) {
    this.exercisesService.saveExercise({ exercise_name: model.exercise_name, muscle_group: model.muscle_group })
      .pipe(
        take(1),
        map(res => res.data[0].id),
        tap(id => {
          if (!id) {
            return alert('Не удалось получить идентификатор упражнения при сохранении варианта выполнения. Обратитесь, пожалуйста, к разработчику');
          }

          if (model?.exec_var?.length) {
            model.exec_var.forEach(execution_variant => {
              // сохраняем идентификатор поскольку изначально его не будет в модели
              execution_variant.exercise_id = id;
              // надо каким то образом сделать последовательное сохранение варианта выполнения. или оно того не стоит?
              this.createExecutionVariant(execution_variant)
            })
          }
        }),
        catchError((err: HttpErrorResponse) => {
          alert(err.message);
          return of();
        })
      )
      .subscribe()
  }

  createExecutionVariant(model: IExecutionVariant) {
    this.loader.show();
    this.exercisesService
      .saveExecVar(model)
      .pipe(
        take(1),
        tap(() => this.loader.hide()),
        catchError((err: HttpErrorResponse) => {
          alert(err.message);
          return of();
        })
      )
      .subscribe();
  }

  getExercises(): void {
    this.loader.show();
    const observable: Observable<any> = forkJoin([
      this.exercisesService.loadExercises(),
    ])

    observable
      .pipe(
        take(1),
        tap((val: [][]) => {
          let result: IExerciseView[] = [];
          val[0].forEach((exercise: IExercise) => {
            this.exercisesService.loadExecVars(exercise.id as number)
              .pipe(take(1))
              .subscribe((res: any) => {
                res.forEach((exec_var: IExecutionVariant) => {
                  result.push({
                    id: <number>exercise.id,
                    exercise_name: `${exercise.exercise_name} ${exec_var.name}`,
                    muscle_group: <number>exercise.muscle_group,
                    comment: exec_var.comment,
                    url: exec_var.url
                  })
                });
                this.exercises$.next(result);
              })
          });
        })
      )
      .subscribe(_ => {
        this.loader.hide()
      })
  }

  get bodyParts(): ISelectBox[] {
    return this.body_parts;
  }
}
