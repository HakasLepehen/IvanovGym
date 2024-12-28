import { PolymorpheusComponent, POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { Inject, Injectable, Injector } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { Subject, takeUntil } from 'rxjs';
import { TrainingComponent } from '../training/training.component';
import { TuiDay } from "@taiga-ui/cdk";

@Injectable({
  providedIn: 'root'
})
export class SchedulerConfigService {
  public destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private readonly _dialogs: TuiDialogService,
    private readonly _injector: Injector,
  ) { }

  addTraining(): void {

  }

  openModal(selectedDay: TuiDay) {
    this._dialogs
      .open(new PolymorpheusComponent(TrainingComponent, this._injector),
        {
          label: 'Создание тренировки',
          data: {
            isPlanning: true,
            selectedDay: selectedDay
          },
          closeable: true,
          dismissible: false,
        }
      )
      .pipe(takeUntil(this.destroy$))
      .subscribe()
  }
}
