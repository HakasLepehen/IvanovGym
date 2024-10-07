import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiButtonModule, TuiScrollbarModule } from '@taiga-ui/core';
import { tuiCreateTimePeriods, TuiInputTimeModule } from '@taiga-ui/kit';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TuiScrollbarModule, TuiButtonModule, TuiInputTimeModule],
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TrainingComponent {
  @Input()
  public isPlanning: boolean = false;
  readonly trainingForm = new FormGroup({
    time: new FormControl(null),
  });
  timeSlots = tuiCreateTimePeriods();

  onSubmit(): void {
    console.log(this.trainingForm.controls.time.value);
  }
}
