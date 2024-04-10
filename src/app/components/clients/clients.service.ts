import { IClient } from 'src/app/interfaces/client';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest, HttpResponse, HttpResponseBase } from '@angular/common/http';
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
    return this._http.get<IClient[]>(`${ENV.supabaseUrl}/${this.clientsAPIUrl}`, { params: { select: '*' } }).pipe(
      tap((res: IClient[]) => this.clients$.next(res)),
      takeUntil(this.destroy$)
    );
  }

  createClient(model: IClient) {
    //TODO: Хотелось бы определить какой тип тут указывать в качестве возвращаемого

    delete model.id;
    options.headers.ContentType = 'application/json';
    options.headers.Prefer = 'return-minimal';

    return this._http.post(`${ENV.supabaseUrl}/${this.clientsAPIUrl}`, model, options);
  }

  removeClient(guid: string): Observable<Object> {
    return this._http.delete<Observable<HttpResponse<null>>>(`${ENV.supabaseUrl}/${this.clientsAPIUrl}`, {
      ...options.headers,
      params: { guid: `eq.${guid}` },
    });
  }

  editClient(model: IClient): Observable<Object> {
    options.headers.ContentType = 'application/json';
    options.headers.Prefer = 'return-minimal';

    return this._http.patch(`${ENV.supabaseUrl}/${this.clientsAPIUrl}`, model, {
      ...options.headers,
      params: { id: `eq.${model.id}` },
    });
  }
}
