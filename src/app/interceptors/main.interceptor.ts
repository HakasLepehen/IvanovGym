import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError, EMPTY, catchError } from 'rxjs';
import { ENV } from '../../environment/environment';
import { Router } from '@angular/router';
import { LoaderService } from '../components/loader/loader.service';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class MainInterceptor implements HttpInterceptor {
  token: string = '';
  private static is401Handled: boolean = false;

  constructor(private _router: Router, private loader: LoaderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = this.readTokenFromStorage();

    const newReq: HttpRequest<any> = this.createAuthorizedRequest(req, this.token);

    return next.handle(newReq).pipe(
      catchError((error) => this.handleHttpError(error))
    );
  }

  private readTokenFromStorage(): string {
    const dataFromStorage: string | null = localStorage.getItem('token');
    if (!dataFromStorage) { return ''; }
    try {
      const parsed = JSON.parse(dataFromStorage);
      return typeof parsed === 'string' ? parsed : parsed?.access_token ?? '';
    } catch {
      return '';
    }
  }

  private createAuthorizedRequest(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      headers: req.headers
        .set('content-type', 'application/json')
        .set('apikey', ENV.supabaseKey)
        .set('Authorization', `Bearer ${token}`),
    });
  }

  private handleHttpError(error: unknown): Observable<never> {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 401) {
        if (MainInterceptor.is401Handled) {
          return EMPTY;
        }
        MainInterceptor.is401Handled = true;
        setTimeout(() => { MainInterceptor.is401Handled = false; }, 1000);

        alert('Необходимо авторизоваться заново');
        localStorage.removeItem('token');
        this._router.navigate(['login']);
        return EMPTY;
      }
      if (error.status === 0) {
        alert(`не удалось получить данные с сервера: ${error.message}`);
        return EMPTY;
      }
      alert(`Не удалось выполнить запрос: ${error.message}`);
    }
    return throwError(() => error as any);
  }
}
