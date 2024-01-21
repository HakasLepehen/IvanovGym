import { IClient } from 'src/app/interfaces/client';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { Subject, takeUntil, tap, finalize, Observable } from 'rxjs';
import { ENV } from '../../../environment/environment';
import { supabase } from '../../optionsSupaBase';
import { LoaderService } from '../loader/loader.service';

const options = {
  headers: {
    apikey: ENV.supabaseKey,
    Authorization: `Bearer ${ENV.supabaseKey}`,
    ContentType: 'application/json',
    Prefer: 'return-minimal',
  },
};

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  public clients$: Subject<IClient[]> = new Subject();
  public onLoad: Subject<boolean> = new Subject<boolean>();
  clientsAPIUrl: string = '/rest/v1/clients';
  sub$: Subject<boolean> = new Subject();
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _http: HttpClient,
    public loader: LoaderService,
    private readonly dialogs: TuiDialogService,
    private readonly injector: Injector
  ) {
    this.getClients();
    this.onLoad.next(false);
  }

  getClients(): Observable<IClient[]> {
    // this.showLoader();
    return this._http
      .get<IClient[]>(`${ENV.supabaseUrl}/${this.clientsAPIUrl}`, { params: { select: '*' } })
      .pipe(
        tap((res: IClient[]) => this.clients$.next(res)),
        takeUntil(this.destroy$)
      )
    // .subscribe(() => this.hideLoader());
  }

  createClient(model: IClient) {
    //TODO: Хотелось бы определить какой тип тут указывать

    delete model.id;

    return this._http.post(`${ENV.supabaseUrl}/${this.clientsAPIUrl}`, model, options)
      // .subscribe({
      //   error: (err: any) => {
      //     console.log(err);
      //     this.refreshData();
      //     throw new Error('Не удалось создать клиента, обратитесь к разработчику');
      //   },
      //   complete: () => this.refreshData()
    // })
  }

  async editClient(model: IClient) {
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
