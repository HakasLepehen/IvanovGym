import { LoaderService } from './../loader/loader.service';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { Injectable, Injector } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { catchError, concatMap, from, map, Observable, of, reduce, Subject, take, takeUntil, tap } from 'rxjs';
import { TrainingComponent } from '../training/training.component';
import { TuiDay, TuiTime } from "@taiga-ui/cdk";
import { SchedulerService } from './scheduler.service';
import { ITrainingDialog } from "../../interfaces/training_dialog";
import { HttpErrorResponse } from '@angular/common/http';
import { ITraining } from 'src/app/interfaces/training';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IClient } from 'src/app/interfaces/client';

@Injectable({
  providedIn: 'root'
})
export class SchedulerConfigService {
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public trainings$: Subject<any[]> = new Subject<any>();

  constructor(
    private readonly _dialogs: TuiDialogService,
    private readonly _injector: Injector,
    private schedulerService: SchedulerService,
    private loaderService: LoaderService
  ) { }

  openModal(selectedDay: TuiDay, training?: ITraining) {
    let titleEditingDate: string = '';
    if (!!training) {
      titleEditingDate = new Date(training.planned_date).toLocaleDateString('ru-RU')
    }

    this._dialogs
      .open(new PolymorpheusComponent(TrainingComponent, this._injector),
        {
          label: training ? `Тренировка от ${titleEditingDate}` : 'Создание тренировки',
          data: {
            isPlanning: !!!training,
            selectedDay: selectedDay,
            training: training
          },
          closeable: true,
          dismissible: false,
          size: !!training ? 'fullscreen' : 'm'
        }
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe()
  }

  saveTraining(props: { formValue: any, isCreate: boolean }, context: TuiDialogContext<boolean, ITrainingDialog>): void {
    const mappedExercises: any[] = [];
    let { formValue, isCreate } = props;
    let trainingModel: ITraining;
    let obs: Observable<Object>;

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

    const asd = {
      "exercise": {
      "id": 37,
        "name": "Отжимаянияот брусье вгравитроне гравитроне",
        "url": "https://drive.google.com/file/d/1AyESHwGIWQG0ivf2FNzoZ1ZEq26L7WNY/view?usp=drive_link",
        "comment": "Особенности выполнения отжиманий с акцентом на трицепс: 1) Выберите ширину брусьев соответствующей ширине Ваших плеч 2)В  верхней точке полностью разгибайте руки в локтевых суставах 3) Во время выполнения упражнения руки  движутся вдоль корпуса",
        "exercise_id": 89,
        "exercise_fullname": "Отжимаянияот брусьев /В гравитроне Отжимаянияот брусье вгравитроне гравитроне",
        "body_part_ids": [
        1
      ]
    },
      "execution_number": 2,
      "payload_weight": 0,
      "comment": ""
    }

    formValue.exercises.forEach((exercise: any) => {
      mappedExercises.push({
              id: undefined,
              exec_var_id: exercise.exercise.id,
              execution_number: exercise.execution_number,
              payload_weight: exercise.payload_weight,
              comment: exercise.comment,
      });
    })

    this.schedulerService.saveExercises(mappedExercises)
      .pipe(
        map((exercises) => {
          return (<any>exercises).map((exercise: any) => exercise.id);
        }),
        tap((ids: number[]) => {
          trainingModel.trainingExerciseIds = ids;

          if (isCreate) {
            obs = this.schedulerService.saveTraining(trainingModel)
          } else {
            obs = this.schedulerService.updateTraining(trainingModel);
          }

          obs
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
            .subscribe()
        })
      )
      .subscribe()

    // from(formValue.exercises).pipe(
    //   concatMap((exercise: any) => {
    //     const mappedExercise = {
    //       id: undefined,
    //       exec_var_id: exercise.exercise.id,
    //       execution_number: exercise.execution_number,
    //       payload_weight: exercise.payload_weight,
    //       comment: exercise.comment,
    //     }
    //     return this.schedulerService.saveExercise(mappedExercise)
    //   }),
    //   concatMap((exercise: any) => {
    //     console.log(exercise);
    //     return exercise;
    //   }),
    //   reduce((acc: any[], response) => [...acc, response], [])
    // ).subscribe(allResponses => {
    //   console.log('Все ответы:', allResponses);
    // });
  }

  getTrainings(): void {
    this.loaderService.show()
    this.schedulerService.getTrainings()
      .pipe(
        take(1),
        tap((value: any) => {
          this.trainings$.next(value);
          this.loaderService.hide();
        })
      )
      .subscribe()
  }

  getSameDayTrainings(trainings: ITraining[], day: TuiDay): ITraining[] {
    return trainings.filter((training: ITraining) => {

      const trainingTuiDay = TuiDay.fromUtcNativeDate(new Date(training.planned_date));

      return trainingTuiDay.daySame(day);
    })
  }

  removeTraining(id: number): void {
    this.loaderService.show();
    this.schedulerService.deleteTraining(id)
      .pipe(
        take(1),
        tap(() => this.getTrainings())
      )
      .subscribe()
  }

  public initializeTrainingFormControls(form: FormGroup, model: ITraining, clients: any): void {
    let selectedClient: IClient | undefined;

    form.controls["planned_date"].setValue(TuiDay.fromLocalNativeDate(new Date(model.planned_date)))

    form.controls["time"].setValue(
      // `${model.hour}:${(model.minutes == 0 ? '00' : model.minutes)}`
      new TuiTime(model.hour, model.minutes)
    )

    selectedClient = clients.find((client: IClient) => client.guid === model.clientGUID);
    if (!selectedClient) {
      alert('Не удалось найти клиента, попробуйте перезагрузить страницу!');
      return;
    }
    form.controls["client"].setValue(selectedClient as IClient);
    // (<FormArray>form.controls['exercises']).push(
    //   new FormGroup({
    //     name: new FormControl('', Validators.required),
    //     url: new FormControl(''),
    //     comment: new FormControl('')
    //   })
    // )
  }

  public savingExerciseLogic() {

  }
}
