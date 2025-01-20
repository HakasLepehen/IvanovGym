import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, take } from 'rxjs';
import { ENV } from 'src/environment/environment';
import { IClient } from "../../interfaces/client";

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

  constructor(private readonly httpClient: HttpClient) { }

  getTrainings(): Observable<any[]> {
    return this.httpClient.get<any>(`${ENV.supabaseUrl}/${this.trainingURL}`);
  }

  saveTraining(model: any): Observable<Object> {
    return this.httpClient.post(`${ENV.supabaseUrl}/${this.trainingURL}`, model, options)
  }
}