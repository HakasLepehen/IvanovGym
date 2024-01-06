import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, takeUntil, tap, finalize } from 'rxjs';
import { ENV } from '../../../environment/environment';
import { IClient } from '../../interfaces/client';
import { supabase } from '../../optionsSupaBase';
import { LoaderService } from '../loader/loader.service';
import { TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { ClientOperationsComponent } from 'src/app/components/client-operations/client-operations.component';
import IClientDialog from 'src/app/interfaces/client-dialog';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private _clients$: Subject<IClient[]> = new Subject();
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
  }

  getClients(): void {
    this.showLoader();
    this._http
      .get<IClient[]>(`${ENV.supabaseUrl}/${this.clientsAPIUrl}`, { params: { select: '*' } })
      .pipe(
        tap((res: IClient[]) => this._clients$.next(res)),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.hideLoader());
  }

  loadClients(): Subject<IClient[]> {
    return this._clients$;
  }

  openModal(el?: IClient): Observable<any> {
    return this.dialogs
      .open(new PolymorpheusComponent(ClientOperationsComponent, this.injector), {
        label: el?.fullName ? `Редактирование клиента: ${el.fullName}` : 'Новый клиент',
        data: {
          client: el ? el : {
            fullName: '',
            created_at: new Date(),
            age: 0,
          },
          isEdit: !!el,
        },
        closeable: true,
        dismissible: false,
      })
      .pipe(takeUntil(this.destroy$));
  }

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
