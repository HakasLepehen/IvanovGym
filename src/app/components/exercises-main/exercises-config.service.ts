import { setClientExercises } from './../../store/actions/client-exercises.action';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector, EventEmitter } from '@angular/core';
import { TuiDialogService, TuiDialogContext } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Observable, Subject, catchError, combineAll, combineLatestAll, forkJoin, map, of, take, takeUntil, tap } from 'rxjs';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { BodyParts } from 'src/app/enums/body_parts';
import { ISelectBox } from 'src/app/interfaces/selectbox';
import { IExecutionVariant } from './../../interfaces/execution_variant';
import { IExercise } from './../../interfaces/exercise';
import { ExercisesService } from './exercises.service';
import { ExercisesFormComponent } from '../exercises-form/exercises-form/exercises-form.component';
import IExerciseDialog from 'src/app/interfaces/exercise-dialog';
import { Store } from '@ngrx/store';
import IClientExercise from 'src/app/interfaces/client_exercise';

@Injectable({
  providedIn: 'root'
})
export class ExercisesConfigService {
  private exercises$: Subject<IExercise[]> = new Subject();
  private savingId!: number;
  destroy$: Subject<boolean> = new Subject<boolean>();
  public clientExercises$: Subject<IClientExercise[]> = new Subject();

  constructor(
    private loader: LoaderService,
    private exercisesService: ExercisesService,
    private readonly dialogs: TuiDialogService,
    private readonly injector: Injector,
    private store: Store,
  ) { }

  // тут руки тянутся в tap вызвать метод сохранения варианта выполнения
  createExercise(model: IExercise, context: TuiDialogContext<boolean, IExerciseDialog>) {
    this.exercisesService.saveExercise({ exercise_name: model.exercise_name, muscle_group: model.muscle_group })
      .pipe(
        take(1),
        map(res => res[0].id),
        tap(id => {
          if (!id) {
            return alert('Не удалось получить идентификатор упражнения при сохранении варианта выполнения. Обратитесь, пожалуйста, к разработчику');
          }

          if (model?.exec_var?.length) {
            model.exec_var.forEach(execution_variant => {
              // удаляем идентификатор, поскольку нам не даст сохранить supabase
              delete execution_variant.id;
              // сохраняем идентификатор поскольку изначально его не будет в модели
              execution_variant.exercise_id = id;
              // надо каким то образом сделать последовательное сохранение варианта выполнения. или оно того не стоит?
              this.createExecutionVariant(execution_variant)
            })
          }
        }),
        catchError((err: HttpErrorResponse) => {
          return this.handleError(err.message);
        }),
      )
      .subscribe()
  }

  editExercise(model: IExercise, context: TuiDialogContext<boolean, IExerciseDialog>): void {
    this.loader.show();
    if (model.exec_var?.length) {
      model.exec_var.map(exec_var => {
        if (exec_var?.id) {
          this.editExecutionVariant(exec_var)
        } else {
          exec_var.exercise_id = model.id as number;
          this.createExecutionVariant(exec_var);
        }
      })
    }

    //remove field to save exercise
    delete model.exec_var;

    this.exercisesService.updateExercise(model)
      .pipe(
        tap(
          () => this.closeModal(context),
          take(1),
        ),
        catchError((err: HttpErrorResponse) => {
          return this.handleError(err.message);
        })
      ).subscribe();
  }

  handleError(msg: string) {
    console.log(msg);
    this.loader.hide();
    // this.refreshData();
    return of();
  }

  createExecutionVariant(model: IExecutionVariant) {
    this.loader.show();
    this.exercisesService
      .saveExecVar(model)
      .pipe(
        take(1),
        tap(() => this.loader.hide()),
        catchError((err: HttpErrorResponse) => {
          return this.handleError(err.message);
        })
      ).subscribe();
  }

  editExecutionVariant(model: IExecutionVariant) {
    this.exercisesService
      .updateExecVar(model)
      .pipe(
        take(1),
        catchError((err: HttpErrorResponse) => {
          return this.handleError(err.message);
        })
      ).subscribe();
  }

  deleteExecutionVariant(id: number) {
    this.exercisesService
      .removeExecVar(id)
      .pipe(
        take(1),
        catchError((err: HttpErrorResponse) => {
          return this.handleError(`${err.message}`);
        })
      ).subscribe();
  }

  deleteExercise(model: IExercise): void {
    this.loader.show();
    if (model.exec_var?.length) {
      model.exec_var.map(exec_var => {
        this.deleteExecutionVariant(exec_var.id as number)
      })
    }

    this.exercisesService.removeExercise(model.id as number)
      .pipe(
        tap(take(1)),
        catchError((err: HttpErrorResponse) => {
          return this.handleError(err.message);
        })
      )
      .subscribe();
  }

  loadExercisesByBodypart(body_part: number): void {
    this.loader.show();

    this.exercisesService.loadExercises(body_part)
      .pipe(
        take(1),
        tap((res) => {
          const result: IExercise[] = res as any;

          result.forEach(exercise => {
            this.loadExecutionVariants(exercise);
          })
          this.setClientExercises(result);
          this.loader.hide();
        })
      ).subscribe()
  }

  loadExecutionVariants(exercise: IExercise): void {
    this.loader.show();

    this.exercisesService.loadExecVars(<number>exercise.id)
      .pipe(
        take(1),
        // в душе не чаю откуда такая конструкция. Предложил редактор для фикса ошибки [ts2352]
        tap((res) => exercise.exec_var = res as unknown as Array<IExecutionVariant>
        )
      ).subscribe();
  }

  get exercises(): Subject<IExercise[]> {
    return this.exercises$;
  }

  setClientExercises(val: IExercise[]): void {
    this.exercises$.next(val);
  }

  get bodyParts(): ISelectBox[] {
    return BodyParts;
  }

  openModal(el: IExercise, isEdit: boolean) {
    this.dialogs
      .open(new PolymorpheusComponent(ExercisesFormComponent, this.injector), {
        label: 'Редактирование упражнения:',
        data: {
          model: el,
          isEdit: isEdit,
        },
        closeable: true,
        dismissible: false,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  closeModal(context: TuiDialogContext<boolean, IExerciseDialog>): void {
    this.hideLoader();
    context.completeWith(true);
  }

  hideLoader(): void {
    this.loader.hide();
  }

  getExercisesForClient(): void {
    this.loader.show();
    forkJoin([this.exercisesService.loadAllExercises(), this.exercisesService.loadAllExecVars()])
      .pipe(
        take(1),
        map(([res1, res2]) => {
          return (<any>res2).map((exec_var: IExecutionVariant) => {
            const findEl: IExercise = (<any>res1).find((exercise: IExercise) => exercise.id === exec_var.exercise_id);
            const clientExercise: IClientExercise = exec_var;

            clientExercise.exercise_fullname = `${findEl.exercise_name} ${exec_var.name}`;
            clientExercise.body_part_ids = findEl.muscle_group;

            return clientExercise;
          });
        }),
        tap(result => {
          this.store.dispatch(setClientExercises({ clientExercises: result }))

          this.clientExercises$.next(result);
          this.loader.hide();
        }),
      ).subscribe()
  }
}
