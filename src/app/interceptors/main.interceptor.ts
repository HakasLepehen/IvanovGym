import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { finalize, Observable, tap } from 'rxjs';
import { ENV } from '../../environment/environment';
import { Router } from '@angular/router';
import { LoaderService } from '../services/loader/loader.service';

@Injectable()
export class MainInterceptor implements HttpInterceptor {
  token: string = '';

  constructor(
    private _router: Router,
    private loader: LoaderService
  ) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const dataFromStorage: string | null = localStorage.getItem('token');

    if (dataFromStorage) {
      this.token = JSON.parse(dataFromStorage);
    }

    const newReq: HttpRequest<any> = req.clone({
      headers: req.headers
        .set('content-type', 'application/json')
        .set('apikey', ENV.supabaseKey)
        .set('Authorization', `Bearer ${this.token}`)
    });

    // this.loader.show();

    return next.handle(newReq)
      .pipe(
        tap(
          (event) => {
          },
          error => {
            if (error instanceof HttpErrorResponse) {
              if (error.status === 401) {
                localStorage.removeItem('token');
                return this._router.navigate(['login']);
              }
              if (error.status === 0) {
                return alert(`не удалось получить данные с сервера: ${error.message}`);
              }

              return alert(`Не удалось выполнить запрос: ${error.message}`);
            }
          }
        ),
      )
  }
}
