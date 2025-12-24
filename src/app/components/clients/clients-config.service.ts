import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, Injector } from '@angular/core';
import { tuiDialog, TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { Observable, Subject, catchError, of, take, takeUntil, tap } from 'rxjs';
import { IClient } from 'src/app/interfaces/client';
import IClientDialog from 'src/app/interfaces/client-dialog';
import { ClientsService } from 'src/app/components/clients/clients.service';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { ClientOperationsComponent } from '../client-operations/client-operations.component';
import IClientExercise from 'src/app/interfaces/client_exercise';
import { select, Store } from '@ngrx/store';
import { clientsSelector } from 'src/app/store/selectors/client.selector';
import { setClients, updateClient } from 'src/app/store/actions/client.action';
import { IExercise } from 'src/app/interfaces/exercise';

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
  private readonly dialogs: TuiDialogService = inject(TuiDialogService);

  constructor(
    private loader: LoaderService,
    private readonly cs: ClientsService,
    private readonly injector: Injector,
    private store: Store,
  ) {
    this.onLoad$.subscribe((val: boolean) => {
      if (val) {
        // this.getClients();
      }
    });
  }

  getClients(): void {
    this.loader.show();
    this.cs.getClients()
      .pipe(
        tap((val) => {
          this.store.dispatch(setClients({ clients: val }));
          // тут когда-нибудь могут возникнут ошибки в связи с единообразностью состояния клиентов
          this.clients = val;
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
    this.dialogs.open(new PolymorpheusComponent(ClientOperationsComponent), {
      label: props.client?.fullName ? `Редактирование клиента: ${props.client.fullName}` : 'Новый клиент',
      data: {
        client: props.client
          ? props.client
          : {
            fullName: '',
            created_at: new Date(),
            age: null,
          },
        isEdit: props.isEdit,
        exercises: props.exercises
      },
      closeable: true,
      dismissible: false,
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe();
    //   .subscribe({
    //   next: (data: any) => {
    //     console.info(`Dialog emitted data = ${data}`);
    //   },
    //   complete: () => {
    //     console.info('Dialog closed');
    //   },
    // });
    // this.dialogs
    //   .open(new PolymorpheusComponent(ClientOperationsComponent, this.injector), {
    //     label: props.client?.fullName ? `Редактирование клиента: ${props.client.fullName}` : 'Новый клиент',
    //     data: {
    //       client: props.client
    //         ? props.client
    //         : {
    //           fullName: '',
    //           created_at: new Date(),
    //           age: 0,
    //         },
    //       isEdit: !!props.client,
    //       exercises: props.exercises
    //     },
    //     closeable: true,
    //     dismissible: false,
    //   })
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe();
  }

  addClient(data: IClient, context: TuiDialogContext<boolean, IClientDialog>) {
    // Тут по необходимости будем валидировать данные

    //
    this.loader.show();
    this.cs
      .createClient(data)
      .pipe(
        tap(() => {
          this.closeModal(context);
          this.getClients();
        }),
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
        tap(() => this.getClients()),
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
        tap(() => this.store.dispatch(updateClient({client: model})),),
        tap(() => this.closeModal(context)),
        catchError((err: HttpErrorResponse) => {
          return this.handleError(err.message);
        }),
        takeUntil(this.destroy$))
      .subscribe();
  }

  hideLoaderAndRefresh(): void {
    this.loader.hide();
  }

  closeModal(context: TuiDialogContext<boolean, IClientDialog>): void {
    this.hideLoaderAndRefresh();
    context.completeWith(true);
  }

  // убираю выброс алерта, который выбросится в любом случае в мэйн-интерсепторе
  handleError(msg: string) {
    console.log(msg);
    this.loader.hide();
    return of();
  }

  /**
   * Метод задает поле limitNames для каждого клиента
   * @param exercises - массив упражнений с полным наименованием
   */
  setLimitNamesForClients(exercises: IClientExercise[]): void {
    if (this.clients.length) {
      this.clients.forEach(client => {
        this.clients = this.clients.map((client: IClient) => {
          client = Object.assign({}, client, { limitsNames: [] });
          client.limits?.forEach(num => {
            let [comparedExercise] = exercises.filter(exercise => exercise.id === num);

            (<any>client.limitsNames).push(comparedExercise.exercise_fullname as string);
          })
          return client;
        })
      })
      this.store.dispatch(setClients({ clients: this.clients }))
    }
  }
}
