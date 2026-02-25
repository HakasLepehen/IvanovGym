import { Injectable } from '@angular/core';
import { ENV } from '../../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, of, Subscription, take, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { MainService } from '../main/main.service';

type User = {
  access_token: string;
  token_type: string; // "bearer"
  expires_in: number;
  refresh_token: string;
  // user: unknown;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject: BehaviorSubject<string | null>;
  private token$: Observable<any | null>;
  private isLogin: boolean = false;
  private readonly authUrl = '/auth/v1';
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('apikey', ENV.supabaseKey);
  options = { headers: this.headers };

  constructor(
    private http: HttpClient,
    private _router: Router,
    private mainService: MainService,
  ) {
    this.tokenSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('token')!));
    this.token$ = this.tokenSubject.asObservable();
  }

  signIn(login: string | any, password: string | any) {
    return this.http.post(ENV.supabaseUrl + this.authUrl + '/token?grant_type=password', {
      email: login,
      password: password
    }, this.options)
      .pipe(
        map((response: any) => {
          localStorage.setItem('token', JSON.stringify(response.access_token));
          this.tokenSubject.next(response.access_token);
        }),
        tap(() => this.mainService.initInitializationData()) // не уверен, что тут корректно подгружать другие данные
      )
  }

  getUser(): Subscription {
    return this.http.get(`${ENV.supabaseUrl}${this.authUrl}/user`)
      .pipe(
        take(1),
        tap(res => {
          console.log(res);
          return res;
        })
      ).subscribe();
  }

  signOut() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    this._router.navigate(['/login']);
  }

  /**
   * @returns true - if we have token in state.
   * Only http error 403 will tell us state of authentification
   */
  get isLoggedIn(): boolean {
    // this._token$.subscribe((val: string) => this.isLogin = !!val);
    this.token$.subscribe(val => this.isLogin = !!val);
    return this.isLogin;
  }
}
