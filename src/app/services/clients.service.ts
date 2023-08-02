import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { ENV } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})

export class ClientsService {
  clients: Subject<any[]> = new Subject<any[]>();
  clientsAPIUrl: string = '/rest/v1/clients';

  constructor(
    private _http: HttpClient
  ) {
  }

  getClients() {
    return this._http.get(ENV.supabaseUrl + this.clientsAPIUrl + `?select=*`);
  }
}
