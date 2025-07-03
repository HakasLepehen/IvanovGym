import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { ENV } from 'src/environment/environment';
import { ITraining } from 'src/app/interfaces/training';
import { IExercise } from '../../interfaces/exercise';
import { ITrainingExercise } from '../../interfaces/training_exercise';

const options = {
  headers: {
    apikey: ENV.supabaseKey,
    Authorization: `Bearer ${ENV.supabaseKey}`,
    ContentType: 'application/json',
    Prefer: 'return-minimal',
  },
};

@Injectable({
  providedIn: 'root'
})
export class SchedulerService {
  private readonly trainingURL: string = 'rest/v1/trainings_scheduler';
  private readonly exercisesURL: string = 'rest/v1/training_exercises';

  constructor(private readonly httpClient: HttpClient) { }

  getTrainings(): Observable<any[]> {
    return this.httpClient.get<any>(`${ENV.supabaseUrl}/${this.trainingURL}`);
  }

  saveTraining(model: any): Observable<Object> {
    options.headers.Prefer = 'return=minimal';
    return this.httpClient.post(`${ENV.supabaseUrl}/${this.trainingURL}`, model, options)
  }

  saveExercises(model: ITrainingExercise[]): Observable<Object> {
    options.headers.Prefer = 'return=representation';
    return this.httpClient.post(`${ENV.supabaseUrl}/${this.exercisesURL}`, model, options)
  }

  updateTraining(model: ITraining): Observable<Object> {
    const reqOptions = { ...options, params: new HttpParams().set('id', `eq.${model.id}`) };

    delete model.clientFullName;
    options.headers.Prefer = 'return=minimal';

    return this.httpClient.patch(`${ENV.supabaseUrl}/${this.trainingURL}`, model, reqOptions);
  }

  deleteTraining(id: number): Observable<Object> {
    const reqOptions = { ...options, params: new HttpParams().set('id', `eq.${id}`) };

    return this.httpClient.delete(`${ENV.supabaseUrl}/${this.trainingURL}`, reqOptions)
  }
}