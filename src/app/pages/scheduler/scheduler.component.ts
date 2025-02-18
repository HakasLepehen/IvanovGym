import { IClient } from './../../interfaces/client';
import { Store, select } from '@ngrx/store';
import { ITraining } from './../../interfaces/training';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TuiDay } from '@taiga-ui/cdk';
import { Subject, takeUntil, tap } from 'rxjs';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { SchedulerConfigService } from 'src/app/components/scheduler/scheduler-config.service';
import { clientsSelector } from 'src/app/store/selectors/client.selector';
import { ClientsConfigService } from 'src/app/components/clients/clients-config.service';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchedulerComponent implements OnInit {
  public selectedDay: TuiDay | null = TuiDay.fromLocalNativeDate(new Date(Date.now()));
  public plannedTrainings!: ITraining[];
  public isLoading!: boolean;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private clients!: IClient[];
  public filteredTrainingsByDay!: ITraining[];

  constructor(
    private _schedulerConfigService: SchedulerConfigService,
    private _clientsConfigService: ClientsConfigService,
    private readonly loaderService: LoaderService,
    private readonly store: Store,
    private cd: ChangeDetectorRef
  ) {
  }

  ngOnInit() {
    this._schedulerConfigService.getTrainings();

    // мне не нравится реализация подписок, так как не могу быть уверенным,
    // что все сработает адекватно и на момент получения данных по тренировкам - будут получены данные по клиентам
    this.store
      .pipe(
        select(clientsSelector),
        tap((clients: IClient[]) => {
          this.clients = clients;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe()


    this.loaderService.getLoading()
      .pipe(
        tap((val: boolean) => {
          this.isLoading = val;
          this.cd.detectChanges();
        }),
        takeUntil(this.destroy$),
      )
      .subscribe();

    this._schedulerConfigService.trainings$
      .pipe(
        tap((value: ITraining[]) => {
          value.forEach(training => {
            // we need to find client with given guid and set fullname for him
            let guid = training.clientGUID;
            let clientWithCurrentGUID = this.clients.find(client => client.guid === guid);
            
            if (!clientWithCurrentGUID) console.log('не были получены данные по клиентам');

            training.clientFullName = clientWithCurrentGUID?.fullName;

          })
          this.plannedTrainings = value;
          this.filteredTrainingsByDay = this._schedulerConfigService.getSameDayTrainings(value, this.selectedDay as TuiDay);

        }),
        takeUntil(this.destroy$)
      )
      .subscribe()
  }

  public onDayClick(day: TuiDay | any): void {
    this.selectedDay = day;

    if (this.plannedTrainings) {
      this.filteredTrainingsByDay = this._schedulerConfigService.getSameDayTrainings(this.plannedTrainings, this.selectedDay as TuiDay);
    }
  }

  public addTraining() {
    this._schedulerConfigService.openModal(this.selectedDay as TuiDay);
  }

  public onEditTraining(training: ITraining) {
    this._schedulerConfigService.openModal(this.selectedDay as TuiDay, training);
  }

  public onRemoveTraining(id: number) {
    this._schedulerConfigService.removeTraining(id)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}