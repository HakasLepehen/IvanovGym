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
    return this._http.get<IClient[]>(`${ENV.supabaseUrl}/${this.clientsAPIUrl}`, { params: { select: '*' } }).pipe(
      tap((res: IClient[]) => this.clients$.next(res)),
      takeUntil(this.destroy$)
    );
    // .subscribe(() => this.hideLoader());
  }

  // openModal(el?: IClient): Observable<any> {
  //   return this.dialogs
  //     .open(new PolymorpheusComponent(ClientOperationsComponent, this.injector), {
  //       label: el?.fullName ? `Редактирование клиента: ${el.fullName}` : 'Новый клиент',
  //       data: {
  //         client: el ? el : {
  //           fullName: '',
  //           created_at: new Date(),
  //           age: 0,
  //         },
  //         isEdit: !!el,
  //       },
  //       closeable: true,
  //       dismissible: false,
  //     })
  //     .pipe(takeUntil(this.destroy$));
  // }

  // async addClient(model: IClient) {
  //   delete model.id;

  //   const { data, error } = await supabase.from('clients').insert([model]).select();

  //   if (error) {
  //     console.log(error);
  //     throw new Error('Не удалось добавить клиента, обратитесь к разработчику');
  //   }
  // }

  createClient(model: IClient) {
    //TODO: Хотелось бы определить какой тип тут указывать

    delete model.id;
    options.headers.ContentType = 'application/json';
    options.headers.Prefer = 'return-minimal';

    return this._http.post(`${ENV.supabaseUrl}/${this.clientsAPIUrl}`, model, options);
  }

  removeClient(guid: string): Observable<unknown> {
    return this._http.delete<Observable<unknown>>(`${ENV.supabaseUrl}/${this.clientsAPIUrl}`, {
      ...options.headers,
      params: { guid: `eq.${guid}` },
    });
  }

  async editClient(model: IClient) {
    const { data, error } = await supabase.from('clients').update(model).match({ id: model.id });

    if (error) {
      console.log(error);
      throw new Error('Не удалось отредактировать клиента, обратитесь к разработчику');
    }
  }
}
