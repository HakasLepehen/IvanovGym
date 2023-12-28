import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private _loading: boolean = false;
  constructor() {}

  show(): void {
    this._loading = true;
  }

  hide(): void {
    this._loading = false;
  }

  getLoading(): boolean {
    return this._loading;
  }
}
