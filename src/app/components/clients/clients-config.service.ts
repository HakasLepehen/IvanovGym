import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Subject, catchError, of, take, takeUntil, tap } from 'rxjs';
import { IClient } from 'src/app/interfaces/client';
import IClientDialog from 'src/app/interfaces/client-dialog';
import { ClientsService } from 'src/app/components/clients/clients.service';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { ClientOperationsComponent } from '../client-operations/client-operations.component';
import IClientExercise from 'src/app/interfaces/client_exercise';
import { select, Store } from '@ngrx/store';
import { clientsSelector } from 'src/app/store/selectors/client.selector';
import { setClients } from 'src/app/store/actions/client.action';

interface ClientProps {
  client: IClient | null,
  isEdit: boolean,
  exercises: IClientExercise[]
}

@Injectable({
  providedIn: 'root',
})
export class ClientsConfigService {
  clients: IClient[] = [];
  onLoad$: Subject<boolean> = this.cs.onLoad;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private loader: LoaderService,
    private readonly cs: ClientsService,
    private readonly dialogs: TuiDialogService,
    private readonly injector: Injector,
    private store: Store,
  ) {
    this.onLoad$.subscribe((val: boolean) => {
      if (val) {
        this.getClients();
      }
    });
  }

  getClients(): void {
    this.loader.show();
    this.cs.getClients()
      .pipe(
        tap((val) => {
          this.store.dispatch(setClients({clients: val}))
          this.loader.hide()
        }),
        catchError((err: HttpErrorResponse) => {
          return this.handleError(err.message);
        }),
      )
      .subscribe();
  }

  //TODO: не сделана логика обновления списка пользователя
  openModal(props: ClientProps) {
    this.dialogs
      .open(new PolymorpheusComponent(ClientOperationsComponent, this.injector), {
        label: props.client?.fullName ? `Редактирование клиента: ${props.client.fullName}` : 'Новый клиент',
        data: {
          client: props.client
            ? props.client
            : {
              fullName: '',
              created_at: new Date(),
              age: 0,
            },
          isEdit: !!props.client,
          exercises: props.exercises
        },
        closeable: true,
        dismissible: false,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  addClient(data: IClient, context: TuiDialogContext<boolean, IClientDialog>) {
    // Тут по необходимости будем валидировать данные

    //
    this.loader.show();
    this.cs
      .createClient(data)
      .pipe(
        tap(() => this.closeModal(context)),
        catchError((err: HttpErrorResponse) => {
          return this.handleError(err.message);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  removeClient(guid: string): void {
    this.loader.show();
    this.cs
      .removeClient(guid)
      .pipe(
        take(1),
        tap(() => this.hideLoaderAndRefresh()),
        catchError((err: HttpErrorResponse) => {
          return this.handleError(err.message);
        }),
      )
      .subscribe();
  }

  editClient(model: IClient, context: TuiDialogContext<boolean, IClientDialog>): void {
    this.loader.show();
    this.cs
      .editClient(model)
      .pipe(
        tap(() => this.closeModal(context)),
        catchError((err: HttpErrorResponse) => {
          return this.handleError(err.message);
        }),
        takeUntil(this.destroy$))
      .subscribe();
  }

  hideLoaderAndRefresh(): void {
    this.loader.hide();
    this.refreshData();
  }

  closeModal(context: TuiDialogContext<boolean, IClientDialog>): void {
    this.hideLoaderAndRefresh();
    context.completeWith(true);
  }

  // убираю выброс алерта, который выбросится в любом случае в мэйн-интерсепторе
  handleError(msg: string) {
    console.log(msg);
    this.loader.hide();
    this.refreshData();
    return of();
  }

  refreshData() {
    this.onLoad$.next(false);
    this.onLoad$.next(true);
  }
}
