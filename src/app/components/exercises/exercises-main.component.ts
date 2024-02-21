import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ISelectBox } from 'src/app/interfaces/selectbox';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { IExerciseView } from '../../interfaces/exercise_view';
import { ExercisesConfigService } from './exercises-config.service';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises-main.component.html',
  styleUrls: ['./exercises-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExercisesMainComponent implements OnInit, OnDestroy {
  public expandedBlock: boolean = false;
  // exForm!: FormGroup;
  public exForm!: FormGroup;
  public isLoading = false;
  public body_parts: Array<ISelectBox> = [];
  public exercises: IExerciseView[] = [];

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private exercisesConfigService: ExercisesConfigService,
    private loaderService: LoaderService,
  ) { }

  ngOnInit(): void {
    this.body_parts = this.exercisesConfigService.bodyParts;
    // this.exercisesConfigService
    //   .exercises$
    //   .pipe(
    //     tap(res => {
    //       this.exercises = res;
    //       this.changeDetectionRef.markForCheck();
    //     })
    //   )
    //   .subscribe()
    this.loaderService.getLoading().subscribe(val => {
      this.isLoading = val;
      this.changeDetectionRef.markForCheck();
    });

    // this.exForm = this.formBuilder.group({
    //   id: this.formBuilder.control(null),
    //   exercise_name: this.formBuilder.control('', [Validators.required]),
    //   muscle_group: this.formBuilder.control(''),
    //   exec_var: this.formBuilder.array([])
    // })
  }

  show(): void {
    this.expandedBlock = !this.expandedBlock;
  }

  // get exec_var() {
  //   return this.exForm.get('exec_var') as FormArray;
  // }

  click(_: any) {
    // this.exec_var.push(
    //   new FormGroup({
    //     name: new FormControl('', Validators.required),
    //     url: new FormControl(''),
    //     comment: new FormControl('')
    //   })
    // )
  }

  public onSubmit(): void {
    // this.exercisesConfigService.createExercise(this.exForm.value);
    // this.exForm.reset();
    // this.expandedBlock = false;
  }

  ngOnDestroy(): void {
    console.log('меня удалили');
  }

  // @tuiPure
  // stringify(items: readonly ISelectBox[]): TuiStringHandler<TuiContextWithImplicit<number>> {
  //   const map = new Map(items.map(({ id, name }) => [id, name] as [number, string]));

  //   return ({ $implicit }: TuiContextWithImplicit<number>) => map.get($implicit) || '';
  // }
}
