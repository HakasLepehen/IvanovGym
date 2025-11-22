import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TuiDay } from '@taiga-ui/cdk';
import { catchError, combineLatest, distinctUntilChanged, filter, of, shareReplay, Subject, take, takeUntil, tap } from 'rxjs';
import { ClientsConfigService } from 'src/app/components/clients/clients-config.service';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { SchedulerConfigService } from 'src/app/components/scheduler/scheduler-config.service';
import { clientsSelector } from 'src/app/store/selectors/client.selector';

import { IClient } from './../../interfaces/client';
import { ITraining } from './../../interfaces/training';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  ) { }

  ngOnInit() {
    this._schedulerConfigService.getTrainings();

    // мне не нравится реализация подписок, так как не могу быть уверенным,
    // что все сработает адекватно и на момент получения данных по тренировкам - будут получены данные по клиентам
    // Кешируем клиентов, чтобы не перезагружать при каждом изменении
    const clients$ = this.store.pipe(
      select(clientsSelector),
      filter((clients: IClient[]) => !!clients.length),
      distinctUntilChanged((prev, curr) => prev.length === curr.length &&
        prev.every((c, i) => c.guid === curr[i]?.guid)),
      shareReplay(1),
      takeUntil(this.destroy$)
    );

    combineLatest([
      clients$,
      this._schedulerConfigService.trainings$.pipe(
        filter((trainings: ITraining[]) => !!trainings?.length)
      )
    ])
      .pipe(
        takeUntil(this.destroy$),
        tap(([clients, trainings]) => {
          this.clients = clients;
          this.plannedTrainings = trainings;

          if (this.clients?.length) {
            this.plannedTrainings.forEach((training) => {
              // we need to find client with given guid and set fullname for him
              const guid = training.clientGUID;
              const clientWithCurrentGUID = this.clients.find((client) => client.guid === guid);

              if (!clientWithCurrentGUID) {
                console.warn(`Клиент с GUID ${guid} не найден`);
                return;
              }

              training.clientFullName = clientWithCurrentGUID.fullName;
            });
          }

          this.filteredTrainingsByDay = this._schedulerConfigService.getSameDayTrainings(
            trainings,
            this.selectedDay as TuiDay
          );
          this.cd.detectChanges();
        })
      ).subscribe();

    this.loaderService
      .getLoading()
      .pipe(
        tap((val: boolean) => {
          this.isLoading = val;
          this.cd.detectChanges();
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  public onDayClick(day: TuiDay | any): void {
    this.selectedDay = day;

    if (this.plannedTrainings) {
      this.filteredTrainingsByDay = this._schedulerConfigService.getSameDayTrainings(
        this.plannedTrainings,
        this.selectedDay as TuiDay
      );
    }
  }

  public addTraining() {
    this._schedulerConfigService.openModal(this.selectedDay as TuiDay);
  }

  public onEditTraining(training: ITraining) {
    this._schedulerConfigService.openModal(this.selectedDay as TuiDay, training);
  }

  public onRemoveTraining(id: number) {
    this._schedulerConfigService.removeTraining(id);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
