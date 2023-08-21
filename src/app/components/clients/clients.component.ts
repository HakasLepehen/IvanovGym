import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { Client } from '../../models/client';
import { LoaderService } from '../../services/loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit, OnDestroy {
  clients: Client[] = [];
  getClientSubscription!: Subscription;
  addClientSubscription!: Subscription;

  constructor(
    private clientsService: ClientsService,
    public loader: LoaderService
  ) {
  }

  ngOnInit() {
    this.getClientSubscription = this.getClients()
      .subscribe((val: any) => {
        this.clients = val;
      });
  }

  addClient() {
    const client = new Client('asdddd123');
    this.addClientSubscription = this.clientsService.addClient(client).subscribe(() => {
      this.clients.push(client);
    });
  }

  getClients() {
    return this.clientsService.getClients();
  }

  ngOnDestroy() {
    this.getClientSubscription.unsubscribe();
    this.addClientSubscription.unsubscribe();
  }
}
