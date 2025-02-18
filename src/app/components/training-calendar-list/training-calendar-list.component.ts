import { ITraining } from './../../interfaces/training';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges
} from '@angular/core';
import { TuiDay} from '@taiga-ui/cdk';

@Component({
  selector: 'app-training-calendar-list',
  templateUrl: './training-calendar-list.component.html',
  styleUrls: ['./training-calendar-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TrainingCalendarListComponent {
  @Input()
  public selectedDay: TuiDay | null = null;
  @Input()
  public plannedTrainings!: ITraining[];
  @Output()
  public onEditTraining = new EventEmitter<ITraining>();
  @Output()
  public onRemoveTraining = new EventEmitter<number>();

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  public removeTraining(training: ITraining): void {
    this.onRemoveTraining.emit(training.id);
  }

  public editTraining(training: ITraining): void {
    this.onEditTraining.emit(training)
  }

  ngOnInit() {
  }
}
