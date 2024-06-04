import { ExercisesConfigService } from './../exercises-config.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ISelectBox } from 'src/app/interfaces/selectbox';
import { LoaderService } from 'src/app/components/loader/loader.service';
import { IExerciseView } from '../../../interfaces/exercise_view';
import { TuiDialogService } from '@taiga-ui/core';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises-main.component.html',
  styleUrls: ['./exercises-main.component.scss'],
  providers: [
    // {
    //   provide: POLYMORPHEUS_CONTEXT,
    //   useExisting: TuiDialogService
    // }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExercisesMainComponent implements OnInit, OnDestroy {
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
    this.loaderService.getLoading().subscribe(val => {
      this.isLoading = val;
      this.changeDetectionRef.markForCheck();
    });
  }

  ngOnDestroy(): void {
    console.log('меня удалили');
  }
}
