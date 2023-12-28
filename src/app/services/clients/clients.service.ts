import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, tap } from 'rxjs';
import { ENV } from '../../../environment/environment';
import { Client } from '../../models/client';
import { supabase } from '../../optionsSupaBase';
import { LoaderService } from '../loader/loader.service';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  public clients: Subject<Client[]> = new Subject<Client[]>();
  clientsAPIUrl: string = '/rest/v1/clients';

  constructor(private _http: HttpClient, public loader: LoaderService) {}

  getClients(): void {
    this.loader.show();
    this._http
      .get<Client[]>(`${ENV.supabaseUrl}/${this.clientsAPIUrl}`, { params: { select: '*' } })
      .pipe(
        tap((val: Client[]) => this.clients.next(val)),
        tap(() => this.loader.hide())
      )
      .subscribe();
  }

  async addClient(model: Client) {
    delete model.id;

    const { data, error } = await supabase.from('clients').insert([model]).select();

    if (error) {
      console.log(error);
      throw new Error('Не удалось добавить клиента, обратитесь к разработчику');
    }
  }

  async editClient(model: Client) {
    const { data, error } = await supabase.from('clients').update(model).match({ id: model.id });

    if (error) {
      console.log(error);
      throw new Error('Не удалось отредактировать клиента, обратитесь к разработчику');
    }
  }

  async deleteClient(guid: string) {
    const { data, error } = await supabase.from('clients').delete().eq('guid', guid);

    if (error) {
      console.log(error);
      throw new Error('Не удалось удалить клиента, обратитесь к разработчику');
    }
  }

  showLoader(): void {
    this.loader.show();
  }

  hideLoader(): void {
    this.loader.hide();
  }

  getLoader(): boolean {
    return this.loader.getLoading();
  }
}
