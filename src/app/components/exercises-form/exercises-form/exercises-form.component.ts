import IExerciseDialog from 'src/app/interfaces/exercise-dialog';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@taiga-ui/polymorpheus';
import { ChangeDetectionStrategy, Component, EventEmitter, Inject, Input, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TUI_DEFAULT_MATCHER } from '@taiga-ui/cdk';
import { IExercise } from 'src/app/interfaces/exercise';
import { ISelectBox } from 'src/app/interfaces/selectbox';
import { ExercisesConfigService } from '../../exercises-main/exercises-config.service';
import { TUI_VALIDATION_ERRORS, tuiItemsHandlersProvider } from '@taiga-ui/kit';
import { map, of, startWith, Subject, switchMap } from 'rxjs';
import { BodyParts } from '../../../enums/body_parts';

@Component({
  selector: 'app-exercises-form',
  templateUrl: './exercises-form.component.html',
  styleUrls: ['./exercises-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    tuiItemsHandlersProvider({
      stringify: (val: ISelectBox) => {
        // ну это пиздец вообще говно а не код. участвует как при указании выбранного значения,
        // так и при вызове списка элементов селекта
        // if (typeof val === 'string') {
        //   return val;
        // }
        // const body_part: ISelectBox | undefined = BodyParts.find(part => val == part.id)
        // return body_part?.name ?? 'Часть тела не найдена'
        return val.name
      }
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
          {...this.exForm.value, muscle_group: this.exForm.value.muscle_group.id},
          this.context
        );
      } else {
        this.exercisesConfigService.editExercise(
          {...this.exForm.value, muscle_group: this.exForm.value.muscle_group.id},
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
