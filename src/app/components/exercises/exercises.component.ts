import { IExecutionVariant } from './../../interfaces/execution_variant';
import { IExercise } from '../../interfaces/exercise';
import { ExercisesService } from './../../services/exercises/exercises.service';
import { Component, Injector, ChangeDetectionStrategy, OnDestroy, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { TuiDialogService } from '@taiga-ui/core/';
import { delay, of, tap } from 'rxjs';
import { TuiContextWithImplicit, tuiPure, TuiStringHandler } from '@taiga-ui/cdk';
import { BodyParts } from 'src/app/enums/body_parts';
import { ISelectBox } from 'src/app/interfaces/selectbox';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExercisesComponent implements OnInit, OnDestroy {
  expandedBlock: boolean = false;
  // exForm!: FormGroup;
  public exForm!: FormGroup;
  body_parts: Array<ISelectBox> = BodyParts;
  list = [1];

  constructor(
    private readonly dialogs: TuiDialogService,
    private readonly injector: Injector,
    private exService: ExercisesService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.exForm = this.formBuilder.group({
      exercise_name: this.formBuilder.control('', [Validators.required]),
      muscle_groups_id: this.formBuilder.control(''),
      exec_var: this.formBuilder.array([])
    })
  }

  show(): void {
    this.expandedBlock = !this.expandedBlock;
    const model: IExercise = {
      exercise_name: '',
      exec_var: []
    };
    // if (this.expandedBlock) {
    //   this.exForm = this.formBuilder.group({
    //     exercise_name: this.formBuilder.control(model.exercise_name, [Validators.required]),
    //     muscle_groups_id: this.formBuilder.control(model.muscle_groups_id),
    //     exec_var: this.formBuilder.array([
    //     ])
    //   })
    // }
    // const exec: IExecutionVariant = {
    //   name: 'Новое упражнение',
    //   url: '',
    //   comment: '',
    // };
  }

  get exec_var() {
    return this.exForm.get('exec_var') as FormArray;
  }

  click(e: any) {
    // if (this.expandedBlock) {
    this.exec_var.push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        url: new FormControl(''),
        comment: new FormControl('')
      })
    )
    // }
  }

  onSubmit(): void { }

  ngOnDestroy(): void {
    console.log('меня удалили');
  }

  @tuiPure
  stringify(items: readonly ISelectBox[]): TuiStringHandler<TuiContextWithImplicit<number>> {
    const map = new Map(items.map(({ id, name }) => [id, name] as [number, string]));

    return ({ $implicit }: TuiContextWithImplicit<number>) => map.get($implicit) || '';
  }
}
