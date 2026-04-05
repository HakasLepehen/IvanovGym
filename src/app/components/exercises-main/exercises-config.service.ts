import { HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Store } from '@ngrx/store';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusComponent } from '@taiga-ui/polymorpheus';
import { BehaviorSubject, Subject, catchError, forkJoin, map, of, take, takeUntil, tap } from 'rxjs';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { BodyParts } from 'src/app/enums/body-parts';
import IExerciseDialog from 'src/app/interfaces/exercise-dialog';
import { ISelectBox } from 'src/app/interfaces/selectbox';
import { ExercisesFormComponent } from '../exercises-form/exercises-form/exercises-form.component';
import { IExercise } from './../../interfaces/exercise';
import { setClientExercises } from './../../store/actions/client-exercises.action';
import { ExercisesService } from './exercises.service';

@Injectable({
  providedIn: 'root'
})
export class ExercisesConfigService {
  private exercises$: BehaviorSubject<IExercise[]> = new BehaviorSubject<IExercise[]>([]);
  private savingId!: number;
  destroy$: Subject<boolean> = new Subject<boolean>();
  public clientExercises$: Subject<IExercise[]> = new Subject();

  constructor(
    private loader: LoaderService,
    private exercisesService: ExercisesService,
    private readonly dialogs: TuiDialogService,
    private readonly injector: Injector,
    private store: Store,
  ) { }

  // тут руки тянутся в tap вызвать метод сохранения варианта выполнения
  createExercise(model: IExercise, context: TuiDialogContext<boolean, IExerciseDialog>) {
    this.exercisesService.saveExercise(model)
      .pipe(
        take(1),
        tap((exercise) => exercise),
        catchError((err: HttpErrorResponse) => {
          return this.handleError(err.message);
        }),
      )
      .subscribe()
  }

  editExercise(model: IExercise, context: TuiDialogContext<boolean, IExerciseDialog>): void {
    this.loader.show();

    this.exercisesService.updateExercise(model)
      .pipe(
        tap(
          () => this.closeModal(context),
          take(1),
        ),
        catchError((err: HttpErrorResponse) => {
          return this.handleError(err.message);
        })
      ).subscribe();
  }

  handleError(msg: string) {
    console.log(msg);
    this.loader.hide();
    // this.refreshData();
    return of();
  }

  deleteExercise(model: IExercise): void {
    this.loader.show();

    this.exercisesService.removeExercise(model.id as number)
      .pipe(
        tap(take(1)),
        catchError((err: HttpErrorResponse) => {
          return this.handleError(err.message);
        })
      )
      .subscribe();
  }

  loadExercisesByBodypart(body_part: number): void {
    this.loader.show(`Загружаю упражнения на: ${BodyParts[body_part].name}`);

    this.exercisesService.loadExercises(body_part)
      .pipe(
        take(1),
        tap((res) => {
          const result: IExercise[] = res as any;

          this.setExercises(result);
          this.loader.hide();
        })
      ).subscribe()
  }

  get exercises(): BehaviorSubject<IExercise[]> {
    return this.exercises$;
  }

  setExercises(val: IExercise[]): void {
    this.exercises$.next(val);
  }

  get bodyParts(): ISelectBox[] {
    return BodyParts;
  }

  openModal(el: IExercise, isEdit: boolean) {
    this.dialogs
      .open(new PolymorpheusComponent(ExercisesFormComponent, this.injector), {
        label: 'Редактирование упражнения:',
        data: {
          model: el,
          isEdit: isEdit,
        },
        closeable: true,
        dismissible: false,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe();
  }

  closeModal(context: TuiDialogContext<boolean, IExerciseDialog>): void {
    this.hideLoader();
    context.completeWith(true);
  }

  hideLoader(): void {
    this.loader.hide();
  }

  getExercisesForClient(): void {
    this.loader.show('Загружаю информацию по упражнениям');
    forkJoin([this.exercisesService.loadAllExercises()])
      .pipe(
        take(1),
        map(([res1]) => {
          this.store.dispatch(setClientExercises({ clientExercises: res1 }))
          this.clientExercises$.next(res1);
          this.loader.hide();
        }),
      ).subscribe()
  }

    searchByIdentifiers(items: any[], searchString: string) {
    if (!searchString || searchString.trim() === '') {
      return items; // возвращаем все, если строка пустая
    }

    const searchLower = searchString.toLowerCase().trim();

    return items.filter(item =>
      item.name.toLowerCase().includes(searchLower)
    );
  }
}
