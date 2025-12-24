import { Injectable } from '@angular/core';
import { ENV } from '../../../environment/environment';
import { map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user';
import { supabase } from '../../optionsSupaBase';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly authUrl = '/auth/v1';

  constructor(
    private http: HttpClient,
  ) { }


  signUp(login: string, password: string) {
    return this.http.post(ENV.supabaseUrl + this.authUrl + '/signup', {
      email: login,
      password: password,
    })
      .pipe(
        map((response: any) => {
          console.log(response);
        })
      )
  }

  async getAllUsers() {
    const {data, error} = await supabase.auth.admin.listUsers()
    of(data)
      .subscribe((response: any) => {
        console.log(response);
      })
  }

  getUser(login: string | any, password: string | any) {
    this.http.post(ENV.supabaseUrl + this.authUrl + '/token?grant_type=password', {
      email: login,
      password: password
    })
      .subscribe((response: any) => {
        if (response) {
          //TODO: тут необходимо хранить токен ЕСЛИ ПОТРЕБУЕТСЯ
        }
      });
  }
}
