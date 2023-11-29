import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { ENV } from '../../../environment/environment';
import { Client } from '../../models/client';
import { supabase } from '../../optionsSupaBase';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  clients: Subject<any[]> = new Subject<any[]>();
  clientsAPIUrl: string = '/rest/v1/clients';

  constructor(private _http: HttpClient) {}

  async getClients(): Promise<Client[] | string> {
    const { data, error } = await supabase.from('clients').select();

    if (error) {
      console.log(error);
      throw new Error('Не удалось получить данные по клиентам, обратитесь к разработчику');
    }
    return data;
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
}
