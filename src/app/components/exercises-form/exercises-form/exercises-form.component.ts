import { IExecutionVariant } from './../../../interfaces/execution_variant';
import IExerciseDialog from 'src/app/interfaces/exercise-dialog';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { Component, ChangeDetectionStrategy, Input, EventEmitter, Output, Inject, AfterContentChecked } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from "@angular/forms";
import { tuiPure, TuiStringHandler, TuiContextWithImplicit, TUI_DEFAULT_MATCHER, tuiIsNumber, TuiHandler } from "@taiga-ui/cdk";
import { IExercise } from "src/app/interfaces/exercise";
import { ISelectBox } from "src/app/interfaces/selectbox";
import { ExercisesConfigService } from "../../exercises-main/exercises-config.service";
import { TUI_VALIDATION_ERRORS, tuiItemsHandlersProvider } from '@taiga-ui/kit';
import { Observable, Subject, debounceTime, fromEvent, map, of, startWith, switchMap, tap, throttleTime } from 'rxjs';

@Component({
  selector: 'app-exercises-form',
  templateUrl: './exercises-form.component.html',
  styleUrls: ['./exercises-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiItemsHandlersProvider({
      stringify: (item: ISelectBox) => item.name
    }),
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Поле обязательно для заполнения',
      },
    },
  ]
})
export class ExercisesFormComponent {
  @Input()
  public model: IExercise | undefined;
  public exForm!: FormGroup;
  private isEdit: boolean = false;
  public body_parts_control!: FormControl;
  private readonly search$ = new Subject<string>();
  @Output() public formSaved: EventEmitter<void> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    @Inject(ExercisesConfigService) private exercisesConfigService: ExercisesConfigService,
    @Inject(POLYMORPHEUS_CONTEXT)
    private context: TuiDialogContext<boolean, IExerciseDialog>
  ) { }

  ngOnInit() {
    if (this.context?.data) {
      this.model = this.context.data.model;
      this.isEdit = this.context.data.isEdit;
    }

    this.exForm = this.formBuilder.group({
      id: this.formBuilder.control(this.model?.id),
      exercise_name: this.formBuilder.control(this.model?.exercise_name, [Validators.required]),
      muscle_group: this.formBuilder.control(this.model?.muscle_group, [Validators.required]),
      exec_var: this.formBuilder.array([])
    })

    this.body_parts_control = this.exForm.get('muscle_group') as FormControl;

    // if we create new exercise - create first execution variant
    if (!this.context?.data?.model) {
      this.exec_var.push(
        new FormGroup({
          id: new FormControl(null),
          name: new FormControl('', [Validators.required]),
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
          name: new FormControl(execution_variant.name, [Validators.required]),
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

  public body_parts$ = this.search$
    .pipe(
      startWith(''),
      switchMap(search =>
        this.b_parts$.pipe(
          map(items => {
            const result = items
              .filter(({ name }) => TUI_DEFAULT_MATCHER(name, search))
              .map(({ id }) => id)
            return result;
          }),
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
    if (this.exForm.valid) {
      if (!this.isEdit) {
        this.exercisesConfigService.createExercise(this.exForm.value, this.context);
      } else {
        this.exercisesConfigService.editExercise(this.exForm.value, this.context)
      }
      this.formSaved.emit();
      this.exForm.reset();
    }
  }

  get exec_var() {
    return this.exForm.get('exec_var') as FormArray;
  }

  onSearch(search: string | null): void {
    this.search$.next(search || '')
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

  removeVariant(num: number) {
    this.exercisesConfigService.deleteExecutionVariant(this.exec_var.at(num).value.id);
    this.exec_var.removeAt(num);
  }
}
