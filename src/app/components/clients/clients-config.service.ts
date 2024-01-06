import { ChangeDetectorRef, Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Client } from 'src/app/models/client';
import { ClientsService } from 'src/app/services/clients/clients.service';

@Injectable({
  providedIn: 'root',
})
export class ClientsConfigService {
  clients: Client[] = [];

  constructor(
    private readonly cs: ClientsService,
  ) {
    this.cs.clients$.subscribe(value => {
      this.clients = value;
    })
  }

  /**
   *  метод возвращающий клиентов
   **/
  getClients(): void {
    this.cs.getClients();
  }
}
