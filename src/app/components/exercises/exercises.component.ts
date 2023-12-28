import { Component, Injector, ChangeDetectionStrategy, OnDestroy, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TuiDialogService } from '@taiga-ui/core/';

@Component({
  selector: 'app-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExercisesComponent implements OnDestroy {
  expandedBlock: boolean = false;
  exForm!: FormGroup;

  constructor(private readonly dialogs: TuiDialogService, private readonly injector: Injector) {}

  show(): void {
    this.expandedBlock = !this.expandedBlock;
    if (this.expandedBlock) {
      this.exForm = new FormGroup({
        exersize_name: new FormControl(),
      });
    }
  }

  onSubmit(): void {}

  ngOnDestroy(): void {
    console.log('меня удалили');
  }
}
