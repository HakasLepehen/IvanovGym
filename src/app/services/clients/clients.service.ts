import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { ENV } from '../../../environment/environment';
import { IClient } from '../../interfaces/client';
import { supabase } from '../../optionsSupaBase';
import { LoaderService } from '../loader/loader.service';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private _clients$: Subject<IClient[]> = new Subject();
  //if 'true' - we need to reload clients
  public onLoad: Subject<boolean> = new Subject();
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

  getClients(): void {
    // this.showLoader();
    this._http
      .get<IClient[]>(`${ENV.supabaseUrl}/${this.clientsAPIUrl}`, { params: { select: '*' } })
      .pipe(
        tap((res: IClient[]) => this._clients$.next(res)),
        takeUntil(this.destroy$)
      )
      .subscribe()
    // .subscribe(() => this.hideLoader());
  }

  loadClients(): Subject<IClient[]> {
    return this._clients$;
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

  async addClient(model: IClient) {
    delete model.id;

    const { data, error } = await supabase.from('clients').insert([model]).select();

    if (error) {
      console.log(error);
      throw new Error('Не удалось добавить клиента, обратитесь к разработчику');
    }
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
