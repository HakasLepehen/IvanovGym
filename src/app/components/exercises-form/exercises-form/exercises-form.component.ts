import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from "@angular/forms";
import { tuiPure, TuiStringHandler, TuiContextWithImplicit } from "@taiga-ui/cdk";
import { IExercise } from "src/app/interfaces/exercise";
import { ISelectBox } from "src/app/interfaces/selectbox";
import { ExercisesConfigService } from "../../exercises-main/exercises-config.service";

@Component({
  selector: 'app-exercises-form',
  templateUrl: './exercises-form.component.html',
  styleUrls: ['./exercises-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExercisesFormComponent {
  @Input()
  public model: IExercise | undefined;
  public expandedBlock: boolean = false;
  public exForm!: FormGroup;
  public body_parts: Array<ISelectBox> = [];

  constructor(
    private formBuilder: FormBuilder,
    private exercisesConfigService: ExercisesConfigService,
  ) { }

  ngOnInit() {
    this.body_parts = this.exercisesConfigService.bodyParts;

    this.exForm = this.formBuilder.group({
      id: this.formBuilder.control(null),
      exercise_name: this.formBuilder.control(this.model?.exercise_name, [Validators.required]),
      muscle_group: this.formBuilder.control(''),
      exec_var: this.formBuilder.array([])
    })
  }

  public show(): void {
    this.expandedBlock = !this.expandedBlock;
    if (!this.expandedBlock) {
      this.model = undefined;
      this.exForm.reset();
    }
    console.log(this.model);

  }

  public onSubmit(): void {
    this.exercisesConfigService.createExercise(this.exForm.value);
    this.exForm.reset();
    this.expandedBlock = false;
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

  @tuiPure
  stringify(items: readonly ISelectBox[]): TuiStringHandler<TuiContextWithImplicit<number>> {
    const map = new Map(items.map(({ id, name }) => [id, name] as [number, string]));

    return ({ $implicit }: TuiContextWithImplicit<number>) => map.get($implicit) || '';
  }
}
