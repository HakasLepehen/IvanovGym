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
    Prefer: 'return=minimal'
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
    return from(supabase
      .from('exercises')
      .insert([model])
      .select()
    )
  }

  saveExecVar(model: IExecutionVariant) {
    return this._http.post(`${ENV.supabaseUrl}/${this._execVarsAPIUrl}`, model, options);
  }

  loadExercises(body_part: number) {
    let params = new HttpParams();

    params = params.append('muscle_group', `eq.{${body_part}}`);
    params = params.append('select', `*`);
    options.params = params;
    delete options.headers.Prefer;
    return this._http.get(`${ENV.supabaseUrl}/${this._exercisesAPIUrl}`, options);
  }

  loadExecVars(exerciseId: number) {
    let params = new HttpParams();

    delete options?.params;
    delete options.headers.Prefer;
    params = params.set('exercise_id', `eq.${exerciseId}`);
    params = params.set('select', `*`);
    options.params = params;

    return this._http.get(`${ENV.supabaseUrl}/${this._execVarsAPIUrl}`, options);
  }
}
