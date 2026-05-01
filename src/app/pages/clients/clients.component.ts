import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  Signal
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { select, Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { IClient } from 'src/app/interfaces/client';
import { clientExercisesSelector } from 'src/app/store/selectors/client-exercises.selector';
import { clientsSelector } from 'src/app/store/selectors/client.selector';
import { ClientsConfigService } from '../../components/clients/clients-config.service';
import { ClientsService } from '../../components/clients/clients.service';
import { ExercisesConfigService } from '../../components/exercises-main/exercises-config.service';
import { IExercise } from '../../interfaces/exercise';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsComponent implements OnInit, OnDestroy {
  public clients: IClient[] = [];
  private exercises: IExercise[] = [];
  public isLoading: Signal<boolean>;

  constructor(
    private clientsService: ClientsService,
    private exercisesConfigService: ExercisesConfigService,
    private clientsConfigService: ClientsConfigService,
    private loaderService: LoaderService,
    private store: Store
  ) {
    this.isLoading = toSignal(this.loaderService.getLoading(), {initialValue: true})
  }

  ngOnInit() {
    this.store.pipe(
      select(clientsSelector),
      tap(val => this.clients = val)
    ).subscribe()

    this.store.pipe(
      select(clientExercisesSelector),
      tap(exercises => {
        this.exercises = exercises;
        this.clientsConfigService.setLimitNamesForClients(exercises);
      })
    ).subscribe()
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
  }
}
