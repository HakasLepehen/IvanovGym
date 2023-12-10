import { Component, Injector } from '@angular/core';
import { TuiDialogService } from '@taiga-ui/core/';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss'],
})
export class ExercisesComponent {

  constructor(private readonly dialogs: TuiDialogService, private readonly injector: Injector) {}

  show(): void {
    alert('asdasdasd');
  }
}
