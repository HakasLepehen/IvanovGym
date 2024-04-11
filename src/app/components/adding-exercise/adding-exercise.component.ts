import { IExercise } from 'src/app/interfaces/exercise';
import { Component, EventEmitter, Output } from '@angular/core';
import { TuiButtonModule, TuiExpandModule } from '@taiga-ui/core';
import { ExercisesFormModule } from '../exercises-form/exercises-form.module';

@Component({
  selector: 'app-adding-exercise',
  standalone: true,
  imports: [TuiButtonModule, TuiExpandModule, ExercisesFormModule],
  templateUrl: './adding-exercise.component.html',
  styleUrls: ['./adding-exercise.component.scss']
})
export class AddingExerciseComponent {
  public expandedBlock: boolean = false;
  public model?: IExercise = {
    exercise_name: '',
    exec_var: [],
    muscle_group: null,
  }

  constructor() {}

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
