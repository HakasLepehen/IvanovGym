import { IExecutionVariant } from '../../interfaces/execution_variant';
import { IExercise } from '../../interfaces/exercise';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, from } from 'rxjs';
import { ENV } from 'src/environment/environment';
import { supabase } from 'src/app/optionsSupaBase';

const options: any = {
  headers: {
    apikey: ENV.supabaseKey,
    Authorization: `Bearer ${ENV.supabaseKey}`,
    ContentType: 'application/json',
    Prefer: 'return=minimal',
  },
};

@Injectable({
  providedIn: 'root',
})
export class ExercisesService {
  private destroy$: Subject<boolean> = new Subject();
  private _exercisesAPIUrl: string = 'rest/v1/exercises';
  private _execVarsAPIUrl: string = 'rest/v1/execution_variants';
  public onLoad: Subject<boolean> = new Subject<boolean>();

  constructor(private _http: HttpClient) {
    this.getExercises();
    this.onLoad.next(false);
  }

  getExercises() {
    console.log('we are get exercises');
  }

  saveExercise(model: IExercise): Observable<any> {
    delete model.id;
    options.headers.prefer = 'return=representation';

    return this._http.post(`${ENV.supabaseUrl}/${this._exercisesAPIUrl}`, model, options)
  }

  saveExecVar(model: IExecutionVariant): Observable<any> {
    return this._http.post(`${ENV.supabaseUrl}/${this._execVarsAPIUrl}`, model, options);
  }

  loadExercises(body_part: number) {
    let params = new HttpParams();

    params = params.append('muscle_group', `cs.{${body_part}}`);
    params = params.append('select', `*`);
    options.params = params;
    options.headers.Range = '0-9'
    delete options.headers.Prefer;

    return this._http.get(`${ENV.supabaseUrl}/${this._exercisesAPIUrl}`, options);
  }

  loadExecVars(exerciseId: number): Observable<ArrayBuffer> {
    let params = new HttpParams();

    delete options?.params;
    delete options.headers.Prefer;
    params = params.set('exercise_id', `eq.${exerciseId}`);
    params = params.set('select', `*`);
    options.params = params;

    return this._http.get(`${ENV.supabaseUrl}/${this._execVarsAPIUrl}`, options);
  }

  updateExercise(model: IExercise): Observable<any> {
    options.headers.ContentType = 'application/json';
    options.headers.Prefer = 'return-minimal';

    return this._http.patch(`${ENV.supabaseUrl}/${this._exercisesAPIUrl}`, model, {
      ...options.headers,
      params: { id: `eq.${model.id}` },
    });
  }

  updateExecVar(model: IExecutionVariant): Observable<ArrayBuffer> {
    options.headers.ContentType = 'application/json';
    options.headers.Prefer = 'return-minimal';

    return this._http.patch(`${ENV.supabaseUrl}/${this._execVarsAPIUrl}`, model, {
      ...options.headers,
      params: { id: `eq.${model.id}` },
    });
  }

  removeExecVar(id: number) {
    let params = new HttpParams();

    delete options.headers.ContentType;
    delete options.headers.Prefer;
    params = params.set('id', `eq.${id}`);

    return this._http.delete(`${ENV.supabaseUrl}/${this._execVarsAPIUrl}`, options)
  }

  removeExercise(id: number): Observable<any> {
    let params = new HttpParams();

    delete options.headers.ContentType;
    delete options.headers.Prefer;
    params = params.set('id', `eq.${id}`);

    return this._http.delete<Observable<HttpResponse<null>>>(`${ENV.supabaseUrl}/${this._exercisesAPIUrl}`, {
      ...options.headers,
      params: params
    })
  }
}
