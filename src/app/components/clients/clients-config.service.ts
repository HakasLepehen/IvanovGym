import { Injectable, Injector } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { Subject, takeUntil } from 'rxjs';
import { IClient } from 'src/app/interfaces/client';
import { ClientsService } from 'src/app/services/clients/clients.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ClientOperationsComponent } from '../client-operations/client-operations.component';

@Injectable({
  providedIn: 'root',
})
export class ClientsConfigService {
  clients: IClient[] = [];
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    public loader: LoaderService,
    private readonly cs: ClientsService,
    private readonly dialogs: TuiDialogService,
    private readonly injector: Injector
  ) {
    // this.cs.clients$.subscribe((value) => {
    //   this.clients = value;
    // });
  }

  /**
   *  метод возвращающий клиентов
   **/
  getClients(): void {
    this.cs.getClients();
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

  // ЭТО МОЖЕТ ПРИГОДИТЬСЯ ЧУТЬ ПОЗЖЕ!!!!

  // showLoader(): void {
  //   this.loader.show();
  // }

  // hideLoader(): void {
  //   this.loader.hide();
  // }

  getLoader(): boolean {
    return this.loader.getLoading();
  }
}
