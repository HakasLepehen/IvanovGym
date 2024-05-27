import { IExecutionVariant } from './../../../interfaces/execution_variant';
import IExerciseDialog from 'src/app/interfaces/exercise-dialog';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output, Inject } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from "@angular/forms";
import { tuiPure, TuiStringHandler, TuiContextWithImplicit, TUI_DEFAULT_MATCHER, tuiIsNumber, TuiHandler } from "@taiga-ui/cdk";
import { IExercise } from "src/app/interfaces/exercise";
import { ISelectBox } from "src/app/interfaces/selectbox";
import { ExercisesConfigService } from "../../exercises-main/exercises-config.service";
import { tuiItemsHandlersProvider } from '@taiga-ui/kit';
import { Observable, Subject, map, of, startWith, switchMap } from 'rxjs';

@Component({
  selector: 'app-exercises-form',
  templateUrl: './exercises-form.component.html',
  styleUrls: ['./exercises-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiItemsHandlersProvider({
      stringify: (item: ISelectBox) => item.name
    })
  ]
})
export class ExercisesFormComponent {
  @Input()
  public model: IExercise | undefined;
  public exForm!: FormGroup;
  // public body_parts: Array<ISelectBox> = [];
  public body_parts_control!: FormControl;
  private readonly search$ = new Subject<string>();
  @Output() public formSaved: EventEmitter<void> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    @Inject(ExercisesConfigService) private exercisesConfigService: ExercisesConfigService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private context: TuiDialogContext<any, IExerciseDialog>
  ) { }

  ngOnInit() {
    // this.body_parts = this.exercisesConfigService.bodyParts;

    if (this.context?.data) {
      this.model = this.context.data.exercise;
    }

    this.exForm = this.formBuilder.group({
      id: this.formBuilder.control(this.model?.id),
      exercise_name: this.formBuilder.control(this.model?.exercise_name, [Validators.required]),
      muscle_group: this.formBuilder.control(this.model?.muscle_group),
      exec_var: this.formBuilder.array([])
    })

    this.body_parts_control = this.exForm.get('muscle_group') as FormControl;

    // if we create new exercise - create first execution variant
    if (!this.context?.data.exercise) {
      this.exec_var.push(
        new FormGroup({
          id: new FormControl(null),
          name: new FormControl(''),
          url: new FormControl(''),
          comment: new FormControl(''),
          exercise_id: new FormControl(null),
        })
      )
    }

    this.model?.exec_var?.forEach(execution_variant => {
      this.exec_var.push(
        new FormGroup({
          id: new FormControl(execution_variant.id),
          name: new FormControl(execution_variant.name),
          url: new FormControl(execution_variant?.url),
          comment: new FormControl(execution_variant?.comment),
          exercise_id: new FormControl(execution_variant.exercise_id),
        })
      )
    })
  }

  /**
   *  сделал по образу и подобию с версией Тинькофф
   **/
  public readonly b_parts$ = of(this.exercisesConfigService.bodyParts);

  public readonly body_parts$ = this.search$
    .pipe(
      startWith(''),
      switchMap(search =>
        this.b_parts$.pipe(
          map(items =>
            items
              .filter(({ name }) => TUI_DEFAULT_MATCHER(name, search))
              .map(({ id }) => id)
          ),
        ),
      ),
      startWith(null)
  );

  stringify$: Observable<any>
    = this.b_parts$.pipe(
      map(items => new Map(items.map<[number, string]>(({ id, name }) => [id, name]))),
      startWith(new Map()),
      map(
        map => (id: TuiContextWithImplicit<number> | number) =>
          (tuiIsNumber(id) ? map.get(id) : map.get(id.$implicit)) || 'Loading...',
      )
    );

  public onSubmit(): void {
    // this.exercisesConfigService.createExercise(this.exForm.value);
    // this.exForm.reset();
    // this.formSaved.emit();
    console.log(this.exForm.value);
  }

  get exec_var() {
    return this.exForm.get('exec_var') as FormArray;
  }



  addVariant(_: any) {
    this.exec_var.push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        url: new FormControl(''),
        comment: new FormControl('')
      })
    )
  }

  // @tuiPure
  // stringify(items: readonly ISelectBox[]): TuiStringHandler<TuiContextWithImplicit<number>> {
  //   const map = new Map(items.map(({ id, name }) => [id, name] as [number, string]));

  //   return ({ $implicit }: TuiContextWithImplicit<number>) => map.get($implicit) || '';
  // }
}
