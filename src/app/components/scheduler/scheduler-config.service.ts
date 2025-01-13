import { LoaderService } from './../loader/loader.service';
import { PolymorpheusComponent, POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { Inject, Injectable, Injector } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { catchError, Observable, of, Subject, Subscription, take, takeUntil, tap } from 'rxjs';
import { TrainingComponent } from '../training/training.component';
import { TuiDay } from "@taiga-ui/cdk";
import { SchedulerService } from './scheduler.service';
import { PayloadModels } from 'src/app/interfaces/payload_models';
import { ITrainingDialog } from "../../interfaces/training_dialog";
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SchedulerConfigService {
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public trainings$: Subject<any[]> = new Subject<PayloadModels.PlanningTrainingModel[]>();

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

  saveTraining(props: { selectedDate: Date, formValue: any, isCreate: boolean }, context: TuiDialogContext<boolean, ITrainingDialog>): void {
    let {selectedDate, formValue, isCreate} = props;
    let trainingModel: PayloadModels.PlanningTrainingModel = {};

    // prepare dto before send to backend
    selectedDate.setHours(formValue.time.hours, formValue.time.minutes);
    this.loaderService.show();
    trainingModel = { date: selectedDate, client_id: formValue.client!.id };

    if (isCreate) {
      this.schedulerService.saveTraining(trainingModel)
        .pipe(
          take(1),
          tap(() => {
            this.loaderService.hide();
            context.completeWith(true);
          }),
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

    this.schedulerService.getTrainings()
      .pipe(
        take(1),
        tap((value: PayloadModels.PlanningTrainingModel[]) => {this.trainings$.next(value)})
      )
      .subscribe()
  }
}
