import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ClientsService } from '../../components/clients/clients.service';
import { ExercisesService } from '../../components/exercises-main/exercises.service';
import { forkJoin, take, tap } from 'rxjs';
import { IClient } from '../../interfaces/client';
import { IExercise } from '../../interfaces/exercise';
import { setClients } from '../../store/actions/client.action';
import { LoaderService } from '../../components/loader/loader.service';
import { setClientExercises } from '../../store/actions/client-exercises.action';

@Injectable({
  providedIn: 'root',
})
export class MainService {
  constructor(
    private loaderService: LoaderService,
    private store: Store,
    private cs: ClientsService,
    private exercisesServise: ExercisesService
  ) {}

  public initInitializationData(): void {
    this.loaderService.show();
    forkJoin([this.cs.getClients(), this.exercisesServise.loadAllExercises()])
      .pipe(
        take(1),
        tap(([clients, exersises]: [IClient[], IExercise[]]) => {
          this.store.dispatch(setClients({ clients: clients }));
          this.store.dispatch(setClientExercises({ clientExercises: exersises }));
          this.loaderService.hide();
        })
      )
      .subscribe();
  }
}
