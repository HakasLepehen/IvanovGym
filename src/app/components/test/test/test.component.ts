// import { ChangeDetectionStrategy, Component } from '@angular/core';
// import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
// import { TUI_DEFAULT_MATCHER, TuiContextWithImplicit, TuiHandler, tuiIsNumber } from '@taiga-ui/cdk';
// import { Observable, Subject, map, shareReplay, startWith, switchMap, timer } from 'rxjs';

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  TUI_DEFAULT_MATCHER,
  TuiContextWithImplicit,
  TuiHandler,
  tuiIsNumber,
} from '@taiga-ui/cdk';
import { Observable, Subject, timer } from 'rxjs';
import { map, shareReplay, startWith, switchMap } from 'rxjs/operators';

const DICTIONARY = [
  { id: 1, name: 'Luke Skywalker' },
  { id: 2, name: 'Princess Leia' },
  { id: 3, name: 'Darth Vader' },
  { id: 4, name: 'Han Solo' },
  { id: 5, name: 'Obi-Wan Kenobi' },
  { id: 6, name: 'Yoda' },
];

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TestComponent {

  profile = this.fb.group({
    firstName: [''],
    lastName: [''],
    aliases: this.fb.array([])
  });

  constructor(private fb: FormBuilder) {

  }

  // #region form

  get aliases() {
    return this.profile.get('aliases') as FormArray;
  }

  add(): void {
    this.aliases.push(new FormGroup({
      street: new FormControl(''),
      city: new FormControl(''),
    }));
    console.log(this.aliases);
  }

  getControl(i: number): any {
    return this.aliases.at(i);
  }

  onSubmit() {
    console.log(this.profile.value);
  }

  // #endregion

  // #region selectbox

  private readonly search$ = new Subject<string>();

  // Server request emulation
  private readonly server$ = timer(5000).pipe(
    map(() => DICTIONARY),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  public readonly items$ = this.search$.pipe(
    startWith(''),
    switchMap(search =>
      this.server$.pipe(
        map(items => {
          const result = items
            .filter(({ name }) => TUI_DEFAULT_MATCHER(name, search))
            .map(({ id }) => id)
          return result;
        }),
      ),
    ),
    startWith(null), // <-- loading
  );

  readonly stringify$: Observable<TuiHandler<TuiContextWithImplicit<number> | number, string>>
    = this.server$.pipe(
      map(items => new Map(items.map<[number, string]>(({ id, name }) => [id, name]))),
      startWith(new Map()),
      map(
        map => (id: TuiContextWithImplicit<number> | number) =>
          (tuiIsNumber(id) ? map.get(id) : map.get(id.$implicit)) || 'Loading...',
      ),
    );

  readonly control = new FormControl([2, 3]);

  onSearch(search: string | null): void {
    this.search$.next(search || '');
  }

  // #endregion

  // #region other

  // items = [1, 2, 3]

  // testForm = new FormGroup({
  //   testValue: new FormControl(),
  // });

  // #endregion
}
