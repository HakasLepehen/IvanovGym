import { ExercisesService } from './exercises.service';
import { Component, Injector, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiDialogService } from '@taiga-ui/core/';
import { TuiContextWithImplicit, tuiPure, TuiStringHandler } from '@taiga-ui/cdk';
import { BodyParts } from 'src/app/enums/body_parts';
import { ISelectBox } from 'src/app/interfaces/selectbox';
import { ExercisesConfigService } from './exercises-config.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

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
  public isLoading = false;
  body_parts: Array<ISelectBox> = BodyParts;
  list = [1];

  constructor(
    private readonly dialogs: TuiDialogService,
    private readonly injector: Injector,
    private exService: ExercisesService,
    private formBuilder: FormBuilder,
    private exercisesConfigService: ExercisesConfigService,
    private loaderService: LoaderService,
  ) { }

  ngOnInit(): void {
    this.loaderService.getLoading().subscribe(val => {
      this.isLoading = val
    });

    this.exForm = this.formBuilder.group({
      id: this.formBuilder.control(null),
      exercise_name: this.formBuilder.control('', [Validators.required]),
      muscle_group: this.formBuilder.control(''),
      exec_var: this.formBuilder.array([])
    })
  }

  show(): void {
    this.expandedBlock = !this.expandedBlock;
  }

  get exec_var() {
    return this.exForm.get('exec_var') as FormArray;
  }

  click(_: any) {
    this.exec_var.push(
      new FormGroup({
        name: new FormControl('', Validators.required),
        url: new FormControl(''),
        comment: new FormControl('')
      })
    )
  }

  public onClose() {}

  public onSubmit(): void {
    this.exercisesConfigService.createExercise(this.exForm.value);
    this.exForm.reset();
    this.expandedBlock = false;
  }

  ngOnDestroy(): void {
    console.log('меня удалили');
  }

  @tuiPure
  stringify(items: readonly ISelectBox[]): TuiStringHandler<TuiContextWithImplicit<number>> {
    const map = new Map(items.map(({ id, name }) => [id, name] as [number, string]));

    return ({ $implicit }: TuiContextWithImplicit<number>) => map.get($implicit) || '';
  }
}
