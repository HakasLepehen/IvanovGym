import { PolymorpheusComponent, POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { Inject, Injectable, Injector } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { Observable, Subject, Subscription, take, takeUntil, tap } from 'rxjs';
import { TrainingComponent } from '../training/training.component';
import { TuiDay } from "@taiga-ui/cdk";
import { SchedulerService } from './scheduler.service';
import { PayloadModels } from 'src/app/interfaces/payload_models';
import { ITrainingDialog } from "../../interfaces/training_dialog";

@Injectable({
  providedIn: 'root'
})
export class SchedulerConfigService {
  public destroy$: Subject<boolean> = new Subject<boolean>();
  public trainings$: Subject<any[]> = new Subject<PayloadModels.PlanningTrainingModel[]>();

  constructor(
    private readonly _dialogs: TuiDialogService,
    private readonly _injector: Injector,
    private schedulerService: SchedulerService
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
    trainingModel = { date: selectedDate, client_id: formValue.client!.id };

    if (isCreate) {
      this.schedulerService.saveTraining(trainingModel)
        .pipe(
          take(1),
          tap(() => context.completeWith(true))
        )
        .subscribe()
    } else {
      alert(`Распиши функцию сохранения редактирования тренировки`);
    }
  }

  getTrainings() {
    return this.schedulerService.getTrainings()
      .pipe(
        take(1),
        tap((value: any[]) => {this.trainings$.next(value)})
      )
      .subscribe()
  }
}
