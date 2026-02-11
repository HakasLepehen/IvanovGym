import { select, Store } from '@ngrx/store';
import { Component, inject, OnChanges, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ClientsConfigService } from './components/clients/clients-config.service';
import { ExercisesConfigService } from './components/exercises-main/exercises-config.service';
import { tap } from 'rxjs/internal/operators/tap';
import { clientExercisesSelector } from './store/selectors/client-exercises.selector';
import { AuthService } from './services/auth/auth.service';
import { IExercise } from './interfaces/exercise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'IvanovGym';
  apiLoaded: boolean = false;

  constructor(
    private location: Location,
    private _clientsConfigService: ClientsConfigService,
    private _authService: AuthService,
    private _exerciseConfigService: ExercisesConfigService,
    private authService: AuthService,
    private store: Store
  ) {
  }

  back() {
    this.location.back();
  }

  back1() {
    this.authService.getUser();
  }

  ngOnInit() {
    this._clientsConfigService.getClients();
    this._exerciseConfigService.getExercisesForClient();

    this.store.pipe(
      select(clientExercisesSelector),
      tap((exercises: IExercise[]) => {
        this._clientsConfigService.setLimitNamesForClients(exercises)
      })
    ).subscribe()
  }
}
