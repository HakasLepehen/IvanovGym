import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ENV } from '../../environment/environment';
import { Router } from '@angular/router';

@Injectable()
export class MainInterceptor implements HttpInterceptor{
  token: string = JSON.parse(localStorage.getItem('token') || '');
  constructor(private _router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const mainReq = req.clone({
      headers: req.headers
        .set('content-type', 'application/json')
        .set('apikey', ENV.supabaseKey)
        .set('Authorization', `Bearer ${this.token}`)
    })

    return next.handle(mainReq).pipe(
      tap(
        (event) => {},
        error => {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              localStorage.removeItem('token');
              this._router.navigate(['login']);
            }
          }
        }
      )
    )
  }
}
