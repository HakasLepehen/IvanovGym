import {
  Component,
  ComponentRef,
  inject,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { TrainingExerciseItemComponent } from '../training-exercise-item/training-exercise-item.component';
import { TuiButton } from '@taiga-ui/core';

@Component({
  selector: 'app-training-exercise-list',
  templateUrl: './training-exercise-list.component.html',
  styleUrls: [ './training-exercise-list.component.scss' ],
  imports: [
    TuiButton
  ],
  standalone: true
})
export class TrainingExerciseListComponent implements OnChanges {
  @Input()
  exercises: any;
  private vcr!: ViewContainerRef;
  @ViewChild('place', {read: ViewContainerRef}) place!: ViewContainerRef;
  private compRef!: ComponentRef<TrainingExerciseItemComponent>;

  constructor() {
  }

  ngOnInit(): void {
  }

  addExercise(): void {
    this.compRef = this.place.createComponent<TrainingExerciseItemComponent>(TrainingExerciseItemComponent);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.exercises.forEach((exerciseFromGroup: any) => {
    //   this.compRef = this.place.createComponent<TrainingExerciseItemComponent>(TrainingExerciseItemComponent);
    // })
  }
}
