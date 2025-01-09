import { PolymorpheusComponent, POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { Inject, Injectable, Injector } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { Subject, take, takeUntil, tap } from 'rxjs';
import { TrainingComponent } from '../training/training.component';
import { TuiDay } from "@taiga-ui/cdk";
import { SchedulerService } from './scheduler.service';
import { PayloadModels } from 'src/app/interfaces/payload_models';

@Injectable({
  providedIn: 'root'
})
export class SchedulerConfigService {
  public destroy$: Subject<boolean> = new Subject<boolean>();

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

  saveTraining(model: PayloadModels.PlanningTrainingModel, isCreate: boolean): void {
    if (isCreate) {
      this.schedulerService.saveTraining(model)
        .pipe(take(1))
        .subscribe()
    } else {
      alert(`Распиши функцию сохранения редактирования тренировки`);
    }
  }
}
