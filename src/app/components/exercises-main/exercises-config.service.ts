import { IExecutionVariant } from './../../interfaces/execution_variant';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, catchError, forkJoin, map, of, take, tap } from 'rxjs';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { BodyParts } from 'src/app/enums/body_parts';
import { ISelectBox } from 'src/app/interfaces/selectbox';
import { IExercise } from './../../interfaces/exercise';
import { ExercisesService } from './exercises.service';

@Injectable({
  providedIn: 'root'
})
export class ExercisesConfigService {
  private exercises$: Subject<IExercise[]> = new Subject();
  private body_parts: ISelectBox[] = BodyParts;
  private savingId!: number;

  constructor(
    private loader: LoaderService,
    private exercisesService: ExercisesService
  ) { }

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

  loadExercises(body_part: number): void {
    this.loader.show();

    this.exercisesService.loadExercises(body_part)
      .pipe(
        take(1),
        tap((res) => {
          const result: IExercise[] = res as any;

          result.forEach(exercise => {
            this.loadExecutionVariants(exercise);
          })
          this.setExercises(result);
          this.loader.hide();
        })
      )
      .subscribe()
  }

  loadExecutionVariants(exercise: IExercise): void {
    this.loader.show();

    this.exercisesService.loadExecVars(<number>exercise.id)
      .pipe(
        take(1),
        // в душе не чаю откуда такая конструкция. Предложил редактор для фикса ошибки [ts2352]
        tap((res) => exercise.exec_var = res as unknown as Array<IExecutionVariant>
        )
      )
      .subscribe();
  }

  get exercises(): Subject<IExercise[]> {
    return this.exercises$;
  }

  setExercises(val: IExercise[]): void {
    this.exercises$.next(val);
  }

  get bodyParts(): ISelectBox[] {
    return this.body_parts;
  }
}
