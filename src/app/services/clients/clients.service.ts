import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ENV } from '../../../environment/environment';
import { Client } from '../../models/client';

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

  getClients(): Observable<any> {
    return this._http.get(ENV.supabaseUrl + this.clientsAPIUrl + `?select=*`);
  }

  addClient(model: Client) {
    const headers = new HttpHeaders().set('Prefer', 'return=minimal');
    return this._http.post(ENV.supabaseUrl + this.clientsAPIUrl, model, { headers: headers })
  }

  deleteClient(guid: string) {
    return this._http.delete(ENV.supabaseUrl + this.clientsAPIUrl, {params: {guid: `eq.${guid}`}})
  }
}
