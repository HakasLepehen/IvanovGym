import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { Subject } from 'rxjs';
import { IClient } from '../../interfaces/client';
import { ClientsService } from '../../services/clients/clients.service';
import { ClientsConfigService } from './clients-config.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit, OnDestroy {
  clients$!: Subject<IClient[]>;
  public isLoading = false;

  constructor(
    private clientsService: ClientsService,
    private clientsConfigService: ClientsConfigService,
    private loaderService: LoaderService,
    @Inject(TuiDialogService) private readonly dialogs: TuiDialogService
  ) {}

  ngOnInit() {
    this.clientsConfigService.getClients();
    this.clients$ = this.clientsService.clients$;
    this.loaderService.getLoading().subscribe(val => {
      this.isLoading = val
    });
  }

  addClient(): void {
    this.clientsConfigService.openModal();
  }

  getClients(): void {
    this.clientsService.getClients();
  }

  editClient(el: IClient): void {
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
