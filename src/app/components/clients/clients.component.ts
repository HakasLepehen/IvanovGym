import { Component, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients/clients.service';
import { Client } from '../../models/client';
import { Subject, Subscription, takeUntil, tap } from 'rxjs';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { ClientOperationsComponent } from '../client-operations/client-operations.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit, OnDestroy {
  clients: Client[] = [];
  getClientSubscription!: Subscription;
  addClientSubscription!: Subscription;
  destroy$: Subject<boolean> = new Subject();
  private readonly createClientDialog = this.dialogs.open(
    new PolymorpheusComponent(ClientOperationsComponent, this.injector),
    {
      label: 'Новый клиент',
      data: {
        client: new Client(''),
        isEdit: false,
      },
      closeable: true,
      dismissible: false,
    }
  );

  constructor(
    private clientsService: ClientsService,
    @Inject(Injector)
    private readonly injector: Injector,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService
  ) {}

  ngOnInit() {
    this.clientsService.clients
      .pipe(
        tap((val: Client[]) => (this.clients = val)),
        takeUntil(this.destroy$)
      )
      .subscribe();
    this.getClients();
  }

  get loader() {
    return this.clientsService.getLoader();
  }

  show(): void {
    this.createClientDialog.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => console.log(),
      complete: () => {
        return this.getClients();
      },
    });
  }

  getClients(): void {
    this.clientsService.getClients();
  }

  editClient(el: any): void {
    // alert('Мы будем редактировать клиента в будущем');
    let editClientDialog = this.dialogs.open(new PolymorpheusComponent(ClientOperationsComponent, this.injector), {
      label: `Редактирование клиента: ${el.fullName}`,
      data: {
        client: el,
        isEdit: true,
      },
      closeable: true,
      dismissible: false,
    });

    editClientDialog.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => console.log(),
      complete: () => {
        return this.getClients();
      },
    });
  }

  removeClient(el: any): void {
    this.clientsService
      .deleteClient(el.guid)
      .then(() => this.getClients())
      .catch((err) => alert(err));
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
