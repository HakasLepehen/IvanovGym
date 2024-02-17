import { IExecutionVariant } from './../../interfaces/execution_variant';
import { IExercise } from './../../interfaces/exercise';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, from } from 'rxjs';
import { ENV } from 'src/environment/environment';
import { supabase } from 'src/app/optionsSupaBase';
import { PostgrestSingleResponse } from '@supabase/postgrest-js/dist/module/types';

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

  constructor(private _http: HttpClient) {
    this.getExercises();
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

  loadExercises() {
    delete options.headers.Prefer
    return this._http.get(`${ENV.supabaseUrl}/${this._exercisesAPIUrl}?select=*`, options);
  }

  loadExecVars(exerciseId: number) {
    delete options.headers.Prefer
    options.headers['Range'] = '0-9';
    return this._http.get(`${ENV.supabaseUrl}/${this._execVarsAPIUrl}?exercise_id=eq.${exerciseId}&select=*`, options);
  }
}
