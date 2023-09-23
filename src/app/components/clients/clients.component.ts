import { Component, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients/clients.service';
import { Client } from '../../models/client';
import { LoaderService } from '../../services/loader/loader.service';
import { Subscription } from 'rxjs';
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
  private readonly createClientDialog = this.dialogs.open(
      new PolymorpheusComponent(ClientOperationsComponent, this.injector),
    {
      label: 'Новый клиент',
      data: {
        client: new Client('Анастасия Доценко'),
        isEdit: true
      },
      closeable: true
    }
  );

  constructor(
    private clientsService: ClientsService,
    public loader: LoaderService,
    @Inject(Injector)
    private readonly injector: Injector,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService
  ) {
  };

  ngOnInit() {
    this.getClients();
  }

  addClient(content: PolymorpheusContent<TuiDialogContext>): void {
    const client = new Client('asdddd123');
    console.log(client);
    // this.addClientSubscription = this.clientsService
    //   .addClient(client)
    //   .subscribe(() => {
    //     this.getClients();
    //   });
  };

  show(): void {
    this.createClientDialog.subscribe({
      next: () => console.log(),
      complete: () => console.log('completed')
    });
  }

  getClients(): void {
    this.getClientSubscription = this.clientsService.getClients()
      .subscribe((val: any) => {
        this.clients = val;
      });
  };

  ngOnDestroy() {
    this.getClientSubscription.unsubscribe();
    this.addClientSubscription.unsubscribe();
  }
}
