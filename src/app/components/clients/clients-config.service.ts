import { Injectable, Injector } from '@angular/core';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Subject, takeUntil } from 'rxjs';
import { IClient } from 'src/app/interfaces/client';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ClientOperationsComponent } from '../client-operations/client-operations.component';
import IClientDialog from 'src/app/interfaces/client-dialog';

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
    private readonly injector: Injector
  ) {
    // this.cs.clients$.subscribe((value) => {
    //   this.clients = value;
    // });
    this.onLoad$.subscribe((val: boolean) => {
      if (val) {
        this.getClients();
      }
    });
  }

  /**
   *  метод возвращающий клиентов
   **/
  getClients(): void {
    this.loader.show();
    this.cs.getClients().subscribe({
      error: (err: any) => {
        console.log(err);
        this.loader.hide();
        alert('Не удалось создать клиента, обратитесь к разработчику');
      },
      complete: () => this.loader.hide(),
    });
  }

  //TODO: не сделана логика обновления списка пользователя
  openModal(el?: IClient) {
    this.dialogs
      .open(new PolymorpheusComponent(ClientOperationsComponent, this.injector), {
        label: el?.fullName ? `Редактирование клиента: из нового сервиса ${el.fullName}` : 'Новый клиент',
        data: {
          client: el
            ? el
            : {
                fullName: '',
                created_at: new Date(),
                age: 0,
              },
          isEdit: !!el,
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
    this.cs.createClient(data).subscribe({
      error: (err: any) => {
        console.log(err);
        this.loader.hide();
        this.refreshData();
        alert('Не удалось создать клиента, обратитесь к разработчику');
      },
      complete: () => {
        this.loader.hide();
        context.completeWith(true);
        this.refreshData();
      },
    });
  }

  // ЭТО МОЖЕТ ПРИГОДИТЬСЯ ЧУТЬ ПОЗЖЕ!!!!

  // showLoader(): void {
  //   this.loader.show();
  // }

  // hideLoader(): void {
  //   this.loader.hide();
  // }

  refreshData() {
    this.onLoad$.next(false);
    this.onLoad$.next(true);
  }
}
