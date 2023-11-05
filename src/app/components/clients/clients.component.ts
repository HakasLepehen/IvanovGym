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
        isEdit: true
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
    this.getClientSubscription = this.clientsService.getClients()
      .subscribe((val: any) => {
        this.clients = val;
      });
  }

  editClient(el: any): void {
    alert('Мы будем редактировать клиента в будущем');
    console.log(el);
  }

  removeClient(el: any): void {
    console.log('Мы будем удалять клиента в будущем', el);
    this.clientsService.deleteClient(el.guid)
      .subscribe({
        error: (err) => {
          alert(err)
          console.log(err);
        },
        complete: () => this.getClients()
      });
  }

  ngOnDestroy() {
    this.getClientSubscription.unsubscribe();
    this.addClientSubscription.unsubscribe();
  }
}
