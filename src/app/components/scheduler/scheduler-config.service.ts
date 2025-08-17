import { LoaderService } from './../loader/loader.service';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { ComponentRef, Injectable, Injector, ViewContainerRef } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { catchError, map, of, Subject, take, takeUntil, tap } from 'rxjs';
import { TrainingComponent } from '../training/training.component';
import { TuiDay, TuiTime } from '@taiga-ui/cdk';
import { SchedulerService } from './scheduler.service';
import { ITrainingDialog } from '../../interfaces/training_dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ITraining } from 'src/app/interfaces/training';
import { FormArray, FormGroup } from '@angular/forms';
import { IClient } from 'src/app/interfaces/client';
import { ITrainingExercise } from '../../interfaces/training_exercise';
import { TrainingExerciseItemComponent } from '../training-exercise-item/training-exercise-item.component';

@Injectable({
  providedIn: 'root'
})
export class SchedulerConfigService {
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public trainings$: Subject<any[]> = new Subject<any>();
  public trainingExercises$: Subject<any[]> = new Subject<any>();

  constructor(
    private readonly _dialogs: TuiDialogService,
    private readonly _injector: Injector,
    private schedulerService: SchedulerService,
    private loaderService: LoaderService
  ) {
  }

  openModal(selectedDay: TuiDay, training?: ITraining) {
    let titleEditingDate: string = '';
    if (!!training) {
      titleEditingDate = new Date(training.planned_date).toLocaleDateString('ru-RU');
    }

    this._dialogs
      .open(new PolymorpheusComponent(TrainingComponent, this._injector), {
        label: training ? `Тренировка от ${titleEditingDate}` : 'Создание тренировки',
        data: {
          isPlanning: !!!training,
          selectedDay: selectedDay,
          training: training
        },
        closeable: true,
        dismissible: false,
        size: !!training ? 'fullscreen' : 'm'
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  saveTraining(
    props: {
      formValue: any;
      isCreate: boolean;
    },
    context: TuiDialogContext<boolean, ITrainingDialog>
  ): void {
    const mappedExercises: any[] = [];
    let { formValue, isCreate } = props;
    let trainingModel: ITraining;

    // prepare dto before send to backend
    this.loaderService.show();
    // expand context data to map values to send server
    trainingModel = {
      ...context.data.training,
      clientGUID: formValue.client.guid,
      planned_date: formValue.planned_date.toUtcNativeDate(),
      hour: formValue.time.hours,
      minutes: formValue.time.minutes
    };

    formValue.exercises.forEach((exercise: any) => {
      mappedExercises.push({
        id: undefined,
        exec_var_id: exercise.exercise.id,
        execution_number: exercise.execution_number,
        payload_weight: exercise.payload_weight,
        comment: exercise.comment
      });
    });


    isCreate ? this.saveTrainingWithoutExercises(trainingModel, context) : this.updateTrainingExercises(trainingModel, mappedExercises, context);

  }

  getTrainings(): void {
    this.loaderService.show();
    this.schedulerService
      .getTrainings()
      .pipe(
        take(1),
        tap((value: any) => {
          this.trainings$.next(value);
          this.loaderService.hide();
        })
      )
      .subscribe();
  }

  getSameDayTrainings(trainings: ITraining[], day: TuiDay): ITraining[] {
    return trainings.filter((training: ITraining) => {
      const trainingTuiDay = TuiDay.fromUtcNativeDate(new Date(training.planned_date));

      return trainingTuiDay.daySame(day);
    });
  }

  removeTraining(id: number): void {
    this.loaderService.show();
    this.schedulerService
      .deleteTraining(id)
      .pipe(
        take(1),
        tap(() => this.getTrainings())
      )
      .subscribe();
  }

  public initializeTrainingFormControls(form: FormGroup, model: ITraining, clients: any): void {
    let selectedClient: IClient | undefined;

    form.controls['planned_date'].setValue(TuiDay.fromLocalNativeDate(new Date(model.planned_date)));

    form.controls['time'].setValue(
      // `${model.hour}:${(model.minutes == 0 ? '00' : model.minutes)}`
      new TuiTime(model.hour, model.minutes)
    );

    selectedClient = clients.find((client: IClient) => client.guid === model.clientGUID);
    if (!selectedClient) {
      alert('Не удалось найти клиента, попробуйте перезагрузить страницу!');
      return;
    }
    form.controls['client'].setValue(selectedClient as IClient);
    // form.controls['exercises'].setValue(model.trainingExerciseIds);
    // (<FormArray>form.controls['exercises']).push(
    //   new FormGroup({
    //     name: new FormControl('', Validators.required),
    //     url: new FormControl(''),
    //     comment: new FormControl('')
    //   })
    // )
  }

  public getTrainingExercisesByTraining(ids: number[] | string[]): any {
    this.schedulerService
      .loadTrainingExercises(ids as number[])
      .pipe(
        take(1),
        tap((exercises: ITrainingExercise[]) => this.trainingExercises$.next(exercises))
      )
      .subscribe();
  }

  /**
   * Создает компонент упражнения с необходимыми для него параметрами
   * @param container
   * @param exercises
   */
  public initializeExerciseComponent(container: ViewContainerRef, exercises: FormArray): void {
    const trainingExerciseComponentRef: ComponentRef<TrainingExerciseItemComponent> =
      container.createComponent<TrainingExerciseItemComponent>(TrainingExerciseItemComponent);

    trainingExerciseComponentRef.setInput('index', exercises.length);
    trainingExerciseComponentRef.instance.messageSent.subscribe(
      ({ id, index }: { id: number | string; index: number }): void => {
        // if we haven't id - we are not saved this exercise
        if (!id) {
          exercises.removeAt(index);
        } else {
          this.schedulerService.deleteExercise(id).pipe(take(1)).subscribe();
        }
        trainingExerciseComponentRef.destroy();
      }
    );
  }

  private saveTrainingWithoutExercises(
    trainingModel: any,
    context: TuiDialogContext<boolean, ITrainingDialog>): void {

    this.schedulerService.saveTraining(trainingModel)
      .pipe(
        take(1),
        tap(() => {
          this.loaderService.hide();
          context.completeWith(true);
        }),
        tap(() => this.getTrainings()),
        catchError((err: HttpErrorResponse) => {
          this.loaderService.hide();
          context.completeWith(true);
          return of();
        })
      )
      .subscribe();
  }

  private updateTrainingExercises(
    trainingModel: any,
    trainingExercises: ITrainingExercise[],
    context: TuiDialogContext<boolean, ITrainingDialog>): void {
    this.loaderService.show();

    this.schedulerService.updateExercises(trainingExercises)
      .pipe(
        take(1),
        map((exercises) => {
          return (<any>exercises).map((exercise: any) => exercise.id);
        }),
        tap((ids: number[]) => {
          trainingModel.trainingExerciseIds = ids;
          this.schedulerService.updateTraining(trainingModel).pipe(take(1)).subscribe()
        }),
        tap(() => this.getTrainings()),
        tap(() => {
          this.loaderService.hide();
          context.completeWith(true);
        }),
        catchError((err: HttpErrorResponse) => {
          this.loaderService.hide();
          context.completeWith(true);
          return of();
        })
      ).subscribe();
  }
}
