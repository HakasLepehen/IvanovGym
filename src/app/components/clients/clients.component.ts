import { Component, OnInit } from '@angular/core';
import { ClientsService } from '../../services/clients.service';
import { IClient } from '../../models/client';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit{
  clients: IClient[] = [];

  constructor(
    private clientsService: ClientsService
  ) {}

  ngOnInit() {
    this.clientsService.getClients()
      .subscribe((val: any) => this.clients = val);
  }
}
