import { ChangeDetectorRef, Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IClient } from 'src/app/interfaces/client';
import { ClientsService } from 'src/app/services/clients/clients.service';

@Injectable({
  providedIn: 'root',
})
export class ClientsConfigService {
  clients: IClient[] = [];

  constructor(private readonly cs: ClientsService) {
    this.cs.clients$.subscribe((value) => {
      this.clients = value;
    });
  }

  /**
   *  метод возвращающий клиентов
   **/
  getClients(): void {
    this.cs.getClients();
  }
}
