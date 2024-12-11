import { select, Store } from '@ngrx/store';
import { IClient } from 'src/app/interfaces/client';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, combineLatest, combineLatestAll, concat, forkJoin, map, of, take, takeUntil, tap } from 'rxjs';
import { ClientsService } from '../../components/clients/clients.service';
import { ClientsConfigService } from '../../components/clients/clients-config.service';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { ExercisesConfigService } from '../../components/exercises-main/exercises-config.service';
import IClientExercise from 'src/app/interfaces/client_exercise';
import { clientsSelector } from 'src/app/store/selectors/client.selector';
import { clientExercisesSelector } from 'src/app/store/selectors/client-exercises.selector';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsComponent implements OnInit, OnDestroy {
  public clients: IClient[] = [];
  private exercises: IClientExercise[] = [];
  public isLoading!: boolean;
  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private clientsService: ClientsService,
    private exercisesConfigService: ExercisesConfigService,
    private clientsConfigService: ClientsConfigService,
    private loaderService: LoaderService,
    private readonly cd: ChangeDetectorRef,
    private store: Store
  ) { }

  ngOnInit() {
    this.store.pipe(
      select(clientsSelector),
      tap(val => {
        val?.length ? this.clients = val : this.clientsConfigService.getClients();
      })
    ).subscribe()

    this.store.pipe(
      select(clientExercisesSelector),
      tap(exercises => {
        exercises?.length ? this.exercises = exercises : this.exercisesConfigService.getExercisesForClient();
        this.clientsConfigService.setLimitNamesForClients(exercises);
      })
    ).subscribe()

    this.loaderService.getLoading().subscribe(val => {
      this.isLoading = val;
      this.cd.markForCheck();
    });
  }

  addClient(): void {
    this.clientsConfigService.openModal({ client: null, isEdit: false, exercises: this.exercises });
  }

  getExercises() {
    this.exercisesConfigService.getExercisesForClient()
  }

  editClient(el: IClient): void {
    this.clientsConfigService.openModal({
      client: el,
      isEdit: true,
      exercises: this.exercises
    });
  }

  removeClient(el: IClient): void {
    this.clientsConfigService.removeClient(<string>el.guid)
  }

  ngOnDestroy(): void {
    this.clientsService.destroy$.next(true);
    this.unsubscribe$.next();
  }
}
