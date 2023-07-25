import { Injectable } from '@angular/core';
import { AuthSession, createClient, SupabaseClient, UserResponse } from '@supabase/supabase-js';
import { ENV } from '../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setToken } from '../store/actions/auth.action';
import { Router } from '@angular/router';

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
  private supabase: SupabaseClient;
  private _token$ = this._store.pipe(select('token'));
  private authUrl = '/auth/v1';
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('apikey', ENV.supabaseKey);
  options = { headers: this.headers };

  constructor(
    private http: HttpClient,
    private _store: Store<{ token: string }>,
    private _router: Router
  ) {
    this.supabase = createClient(ENV.supabaseUrl, ENV.supabaseKey);
  }

  signUp(login: string, password: string) {
    // return this.supabase.auth.signUp({ email: login, password: password });
    this.http.post(ENV.supabaseUrl + this.authUrl + '/signup', {
      email: login,
      password: password
    }, this.options)
      .subscribe((event: any) => {
        if (event) console.log(event);
      });
  }

  signIn(login: string | any, password: string | any): void {
    this.http.post(ENV.supabaseUrl + this.authUrl + '/token?grant_type=password', {
      email: login,
      password: password
    }, this.options)
      .subscribe((event: any) => {
          if (event) {
            this._store.dispatch(setToken({ token: event.access_token }));
            this._router.navigate(['/'])
          }
        }
      )
    ;
  }

  getUser(login: string | any, password: string | any) {
    this.http.post(ENV.supabaseUrl + this.authUrl + '/token?grant_type=password', {
      email: login,
      password: password
    }, this.options)
      .subscribe((response: any) => {
        this._store.dispatch(setToken({ token: response.access_token }));
      });

  }

  /**
   * @returns true - if we have token in state.
   * Only http error 403 will tell us state of authentification
   */
  get isLoggedIn(): boolean {
    console.log('sвводим токен из хранилища ', this._token$);
    return !!this._token$;
  }
}
