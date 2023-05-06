import { Injectable } from '@angular/core';
import { AuthSession, createClient, SupabaseClient, UserResponse } from '@supabase/supabase-js';
import { ENV } from '../../environment/environment';
import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { options } from '../optionsSupaBase';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setToken } from '../store/actions/auth.action';

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
  _session: AuthSession | null = null;
  private _token$!: Observable<string>;
  private authUrl = '/auth/v1';
  headers = new HttpHeaders()
    .set('content-type', 'application/json')
    .set('apikey', ENV.supabaseKey);
  options = { headers: this.headers };

  constructor(
    private http: HttpClient,
    private store: Store<{ token: string }>
  ) {
    this.supabase = createClient(ENV.supabaseUrl, ENV.supabaseKey);
    this._token$ = store.select('token');
    console.log(this._token$);
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
        if (event) console.log(event);
      });
  }

  getUser(login: string | any, password: string | any) {
    this.http.post(ENV.supabaseUrl + this.authUrl + '/token?grant_type=password', {
      email: login,
      password: password
    }, this.options)
      .subscribe((response: any) => {
        this.store.dispatch(setToken({ token: response.access_token } ));
        console.log(response);
      });
  }
}
