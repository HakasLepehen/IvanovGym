import { Component, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients/clients.service';
import { Client } from '../../models/client';
import { LoaderService } from '../../services/loader/loader.service';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent, PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { ClientOperationsComponent } from '../client-operations/client-operations.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit, OnDestroy {
  clients: Client[] = [];
  getClientSubscription!: Subscription;
  addClientSubscription!: Subscription;
  destroy$: Subject<any> = new Subject();
  private readonly createClientDialog = this.dialogs.open(
    new PolymorpheusComponent(ClientOperationsComponent, this.injector),
    {
      label: 'Новый клиент',
      data: {
        client: new Client(''),
        isEdit: false
      },
      closeable: true,
      dismissible: false
    }
  );

  constructor(
    private clientsService: ClientsService,
    public loader: LoaderService,
    @Inject(Injector)
    private readonly injector: Injector,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService
  ) {
  }

  ngOnInit() {
    this.getClients();
  }

  show(): void {
    this.createClientDialog
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => console.log(),
        complete: () => {
          return this.getClients();
        }
      });
  }

  getClients(): void {
    this.clientsService.getClients()
      .then((res: Client[] | string) => {
        console.log(res);
        return this.clients = <Client[]>res;
      })
      .catch(err => alert(err));
  }

  editClient(el: any): void {
    // alert('Мы будем редактировать клиента в будущем');
    let editClientDialog = this.dialogs.open(
      new PolymorpheusComponent(ClientOperationsComponent, this.injector),
      {
        label: `Редактирование клиента: ${el.fullName}`,
        data: {
          client: el,
          isEdit: true
        },
        closeable: true,
        dismissible: false
      }
    );

    editClientDialog.pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => console.log(),
        complete: () => {
          return this.getClients();
        }
      });
  }

  removeClient(el: any): void {
    this.clientsService.deleteClient(el.guid)
      .then(() => this.getClients())
      .catch(err => alert(err));
  }

  ngOnDestroy() {
    this.getClientSubscription.unsubscribe();
    this.addClientSubscription.unsubscribe();
  }
}
