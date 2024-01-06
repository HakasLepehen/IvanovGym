import { ChangeDetectionStrategy, Component, Inject, Injector, OnDestroy, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients/clients.service';
import { IClient } from '../../interfaces/client';
import { Observable, Subject, Subscription, takeUntil, tap } from 'rxjs';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { ClientOperationsComponent } from '../client-operations/client-operations.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  // changeDetection: ChangeDetectionStrategy.Default
})
export class ClientsComponent implements OnInit, OnDestroy {
  clients$!: Subject<IClient[]>;

  constructor(
    private clientsService: ClientsService,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService
  ) {}

  ngOnInit() {
    this.clients$ = this.clientsService.loadClients();
  }

  get loader() {
    return this.clientsService.getLoader();
  }

  addClient(): void {
    this.clientsService.openModal().subscribe(() => this.getClients());
  }

  getClients(): void {
    this.clientsService.getClients();
  }

  editClient(el: IClient): void {
    this.clientsService.openModal(el).subscribe(() => this.getClients());
  }

  removeClient(el: any): void {
    this.clientsService
      .deleteClient(el.guid)
      .then(() => this.getClients())
      .catch((err) => alert(err));
  }

  ngOnDestroy(): void {
    this.clientsService.destroy$.next(true);
  }
}
