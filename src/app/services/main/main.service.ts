import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ClientsService } from '../../components/clients/clients.service';
import { ExercisesService } from '../../components/exercises-main/exercises.service';
import { forkJoin, of, Subject, take, tap } from 'rxjs';
import { IClient } from '../../interfaces/client';
import { IExercise } from '../../interfaces/exercise';
import { setClients } from '../../store/actions/client.action';
import { LoaderService } from '../../components/loader/loader.service';
import { setClientExercises } from '../../store/actions/client-exercises.action';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { clientsSelector } from 'src/app/store/selectors/client.selector';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  private initData$: Subject<void> = new Subject();
  constructor(
    private loaderService: LoaderService,
    private store: Store,
    private cs: ClientsService,
    private exercisesServise: ExercisesService
  ) {
    this.initData$.pipe(
      tap(() => this.initInitializationData()),
      takeUntilDestroyed()
    ).subscribe();
  }

  private initInitializationData(): void {
    this.loaderService.show('Загрузка клиентов и упражнений');
    forkJoin([this.cs.getClients(), this.exercisesServise.loadAllExercises()])
      .pipe(
        take(1),
        tap(([clients, exersises]: [IClient[], IExercise[]]) => {
          this.store.dispatch(setClients({ clients: clients }));
          this.store.dispatch(setClientExercises({ clientExercises: exersises }));
          this.loaderService.hide();
          return null;
        })
      )
      .subscribe()
  }
  public initData(): void {
    this.initData$.next();
  }
}
