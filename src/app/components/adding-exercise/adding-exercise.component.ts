import { IExercise } from 'src/app/interfaces/exercise';
import { Component, EventEmitter, Inject, Output, SkipSelf } from '@angular/core';
import { TuiDialogContext, TuiExpand, TuiButton, TUI_ICON_RESOLVER } from '@taiga-ui/core';
import { ExercisesFormModule } from '../exercises-form/exercises-form.module';
import { TuiStringHandler } from '@taiga-ui/cdk';

@Component({
  selector: 'app-adding-exercise',
  standalone: true,
  imports: [TuiButton, TuiExpand, ExercisesFormModule],
  templateUrl: './adding-exercise.component.html',
  styleUrls: ['./adding-exercise.component.scss'],
})
export class AddingExerciseComponent {
  public expandedBlock: boolean = false;
  public model?: IExercise = {
    name: '',
    // exec_var: [],
    muscle_group: undefined,
  }

  constructor(
  ) {}

  public show(): void {
    this.expandedBlock = !this.expandedBlock;
    if (!this.expandedBlock) {
      this.model = undefined;
    }
  }

  public onSubmit() {
    this.show();
  }
}
