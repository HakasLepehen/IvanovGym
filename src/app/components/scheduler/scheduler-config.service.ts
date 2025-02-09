import { LoaderService } from './../loader/loader.service';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { Injectable, Injector } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { catchError, of, Subject, take, takeUntil, tap } from 'rxjs';
import { TrainingComponent } from '../training/training.component';
import { TuiDay } from "@taiga-ui/cdk";
import { SchedulerService } from './scheduler.service';
import { ITrainingDialog } from "../../interfaces/training_dialog";
import { HttpErrorResponse } from '@angular/common/http';
import { ITraining } from 'src/app/interfaces/training';

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

  openModal(selectedDay: TuiDay) {
    this._dialogs
      .open(new PolymorpheusComponent(TrainingComponent, this._injector),
        {
          label: 'Создание тренировки',
          data: {
            isPlanning: true,
            selectedDay: selectedDay,
            // isEditing: false,
          },
          closeable: true,
          dismissible: false,
        }
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe()
  }

  saveTraining(props: { selectedDate: TuiDay, formValue: any, isCreate: boolean }, context: TuiDialogContext<boolean, ITrainingDialog>): void {
    let { selectedDate, formValue, isCreate } = props;
    let trainingModel: ITraining;

    // prepare dto before send to backend
    this.loaderService.show();
    trainingModel = {
      clientGUID: formValue.client.guid,
      planned_date: selectedDate.toUtcNativeDate(),
      hour: formValue.time.hours,
      minutes: formValue.time.minutes
    };

    if (isCreate) {
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
        .subscribe()
    } else {
      alert(`Распиши функцию сохранения редактирования тренировки`);
    }
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
}
