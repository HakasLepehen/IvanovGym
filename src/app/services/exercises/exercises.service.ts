import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap, takeUntil } from 'rxjs';
import { BodyPart } from 'src/app/modules/body_part/body_part';
import { LoaderService } from '../loader/loader.service';
import { ENV } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ExercisesService {
  public body_parts: Subject<BodyPart[]> = new Subject();
  private destroy$: Subject<boolean> = new Subject();
  private _bodyPartUrl: string = '/rest/v1/muscle_groups';

  constructor(private _http: HttpClient, private loader: LoaderService) {}

  getBodyParts() {
    this.loader.show();
    this._http
      .get<BodyPart[]>(`${ENV.supabaseUrl}/${this._bodyPartUrl}`, { params: { select: '*' } })
      .pipe(
        tap((val: BodyPart[]) => {
          // совершенно не уверен что мне нужен тут маппинг
          const result: Array<BodyPart> = [];

          val.forEach((el) => result.push(new BodyPart(el.id, el.part_name)));
          this.body_parts.next(result);
        }),
        tap(() => this.loader.hide())
      )
      .subscribe();
  }
}
