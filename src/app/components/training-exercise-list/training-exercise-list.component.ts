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
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-training-exercise-list',
  templateUrl: './training-exercise-list.component.html',
  styleUrls: [ './training-exercise-list.component.scss' ],
  imports: [
    TuiButton,
    NgIf
  ],
  standalone: true
})
export class TrainingExerciseListComponent implements OnChanges {
  @Input()
  exercises: any;
  @ViewChild('place', {read: ViewContainerRef}) placeContainer!: ViewContainerRef;
  @ViewChild('empty', {read: ViewContainerRef}) emptyContainer!: ViewContainerRef;

  constructor() {
  }

  ngOnInit(): void {
  }

  addExercise(): void {
    if (!this.exercises?.length) {
      this.emptyContainer.clear();
    }
    this.placeContainer.createComponent<TrainingExerciseItemComponent>(TrainingExerciseItemComponent);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.exercises.forEach((exerciseFromGroup: any) => {
    //   this.compRef = this.place.createComponent<TrainingExerciseItemComponent>(TrainingExerciseItemComponent);
    // })
  }
}
