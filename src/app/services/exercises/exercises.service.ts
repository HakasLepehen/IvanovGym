import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap, takeUntil } from 'rxjs';
import { LoaderService } from '../loader/loader.service';
import { IClient } from 'src/app/interfaces/client';
import { ENV } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ExercisesService {
  private destroy$: Subject<boolean> = new Subject();
  private _bodyPartUrl: string = '/rest/v1/muscle_groups';

  constructor(private _http: HttpClient, private loader: LoaderService) {}
}
