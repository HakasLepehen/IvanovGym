import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { Subject } from 'rxjs';
import { IClient } from '../../interfaces/client';
import { ClientsService } from '../../services/clients/clients.service';
import { ClientsConfigService } from './clients-config.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsComponent implements OnInit, OnDestroy {
  clients$!: Subject<IClient[]>;

  constructor(
    private clientsService: ClientsService,
    private clientsConfigService: ClientsConfigService,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService
  ) {}

  ngOnInit() {
    this.clients$ = this.clientsService.loadClients();
  }

  get loader() {
    return this.clientsConfigService.getLoader();
  }

  addClient(): void {
    // this.clientsService.openModal().subscribe(() => this.getClients());
    this.clientsConfigService.openModal();
  }

  getClients(): void {
    this.clientsService.getClients();
  }

  editClient(el: IClient): void {
    // this.clientsService.openModal(el).subscribe(() => this.getClients());
    this.clientsConfigService.openModal(el);
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
