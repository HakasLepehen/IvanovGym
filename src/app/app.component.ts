import { select, Store } from '@ngrx/store';
import { Component, OnInit, signal, Signal, WritableSignal } from '@angular/core';
import { Location } from '@angular/common';
import { ClientsConfigService } from './components/clients/clients-config.service';
import { ExercisesConfigService } from './components/exercises-main/exercises-config.service';
import { tap } from 'rxjs/internal/operators/tap';
import { clientExercisesSelector } from './store/selectors/client-exercises.selector';
import { AuthService } from './services/auth/auth.service';
import { IExercise } from './interfaces/exercise';
import { LoaderService } from './components/loader/loader.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { combineLatest, EMPTY, filter } from 'rxjs';
import { MainService } from './services/main/main.service';
import { IClient } from './interfaces/client';
import { clientsSelector } from './store/selectors/client.selector';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'IvanovGym';
  apiLoaded: boolean = false;
  isLoading!: Signal<boolean>;

  constructor(
    private location: Location,
    private authService: AuthService,
    private loaderService: LoaderService,
    private mainService: MainService,
    private store: Store,
    private router: Router,
  ) {
    this.isLoading = toSignal(this.loaderService.getLoading(), { initialValue: true });
    router.events.pipe(
      filter((event: any) => event instanceof NavigationStart),
      tap((val) => {
        if (val?.url != '/login') {
          this.store.pipe(
            select(clientsSelector),
            tap((clients: IClient[]) => {
              console.log(clients);
              if (!clients.length) {
                mainService.initData();
                // this.mainService.initInitializationData();
              }
            })
          ).subscribe()
          // mainService.initData();
        }

        return EMPTY
      })
    ).subscribe()
  }

  back() {
    this.location.back();
  }

  back1() {
    this.authService.getUser();
  }

  ngOnInit() {
    // this.store.pipe(
    //   select(clientsSelector),
    //   tap((clients: IClient[]) => {
    //     console.log(clients);
    //     if (!clients.length) {
    //       this.mainService.initData();
    //       // this.mainService.initInitializationData();
    //     }
    //   })
    // ).subscribe()
  }
}
