import { Location } from '@angular/common';
import { Component, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationStart, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { EMPTY, filter } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { LoaderService } from './components/loader/loader.service';
import { IClient } from './interfaces/client';
import { AuthService } from './services/auth/auth.service';
import { MainService } from './services/main/main.service';
import { clientsSelector } from './store/selectors/client.selector';

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
              if (!clients.length) {
                mainService.initData();
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
  }
}
