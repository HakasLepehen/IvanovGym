import IExerciseDialog from 'src/app/interfaces/exercise-dialog';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TUI_DEFAULT_MATCHER } from '@taiga-ui/cdk';
import { IExercise } from 'src/app/interfaces/exercise';
import { ISelectBox } from 'src/app/interfaces/selectbox';
import { ExercisesConfigService } from '../../exercises-main/exercises-config.service';
import { tuiItemsHandlersProvider } from '@taiga-ui/core';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { map, of, startWith, Subject, switchMap } from 'rxjs';
import { BodyParts } from '../../../enums/body-parts';

@Component({
  selector: 'app-exercises-form',
  templateUrl: './exercises-form.component.html',
  styleUrls: ['./exercises-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiItemsHandlersProvider({
      stringify: signal((val: ISelectBox | number) => {
       if (typeof val === 'number') {
          const body_part = BodyParts.find((part: ISelectBox) => part.id === val) as ISelectBox;
          return body_part.name;
        }
        
        return val.name as string
        
      }),
      identityMatcher: signal((a: any, b: any) => a.id === b.id),
      // Сгибание рук со штангой параллельный хват в скамье Скотта
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
  public model!: IExercise | undefined;
  public exForm!: FormGroup;
  private isEdit: boolean = false;
  private readonly search$ = new Subject<string>();
  @Output() public formSaved: EventEmitter<void> = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    // @Inject(ExercisesConfigService) private exercisesConfigService: ExercisesConfigService,
    private exercisesConfigService: ExercisesConfigService,
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
      name: this.formBuilder.control(this.model?.name, [Validators.required]),
      muscle_group: this.formBuilder.control(this.model?.muscle_group, [Validators.required]),
      url: this.formBuilder.control(this.model?.url),
      comment: this.formBuilder.control(this.model?.comment),
    })
  }

  /**
   *  сделал по образу и подобию с версией Тинькофф
   **/
  public readonly b_parts = this.exercisesConfigService.bodyParts;

  public onSubmit(): void {
    if (this.exForm.valid) {
      if (!this.isEdit) {
        this.exercisesConfigService.createExercise(
          { ...this.exForm.value, muscle_group: this.exForm.value.muscle_group.id },
          this.context
        );
      } else {
        this.exercisesConfigService.editExercise(
          { ...this.exForm.value, muscle_group: this.exForm.value.muscle_group.id },
          this.context
        )
      }
      this.formSaved.emit();
      this.exForm.reset();
    }
  }

  get exec_var() {
    return this.exForm.get('exec_var') as FormArray;
  }
}
