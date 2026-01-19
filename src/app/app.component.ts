import { select, Store } from '@ngrx/store';
import { Component, inject, OnChanges, OnInit, SimpleChanges, SkipSelf } from '@angular/core';
import { LoaderService } from './components/loader/loader.service';
import { Location } from '@angular/common';
import { ClientsConfigService } from './components/clients/clients-config.service';
import { ExercisesConfigService } from './components/exercises-main/exercises-config.service';
import { tap } from 'rxjs/internal/operators/tap';
import IClientExercise from './interfaces/client_exercise';
import { clientExercisesSelector } from './store/selectors/client-exercises.selector';
import { TUI_ICON_RESOLVER } from '@taiga-ui/core';
import { TuiStringHandler } from '@taiga-ui/cdk';
import { AuthService } from './services/auth/auth.service';
import { jwtDecode } from 'jwt-decode';
import { Subscription } from 'rxjs';
import { supabase } from './optionsSupaBase';

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
      tap((exercises: IClientExercise[]) => {
        this._clientsConfigService.setLimitNamesForClients(exercises)
      })
    ).subscribe()
  }
}
