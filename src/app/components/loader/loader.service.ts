import { Injectable, signal, WritableSignal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _loading$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public message: WritableSignal<string> = signal('Загрузка...');
  
  constructor() {}

  show(msg: string = 'Загрузка...'): void {
    this.message.set(msg);
    this._loading$.next(true);
  }

  hide(): void {
    setTimeout(() => {
      this._loading$.next(false);
    }, 300);
  }

  getLoading(): BehaviorSubject<boolean> {
    return this._loading$;
  }
}
