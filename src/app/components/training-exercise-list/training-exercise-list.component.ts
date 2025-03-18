import {
  Component,
  ComponentRef, EventEmitter,
  inject,
  Input,
  OnChanges, Output,
  SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { TrainingExerciseItemComponent } from '../training-exercise-item/training-exercise-item.component';
import { TuiButton } from '@taiga-ui/core';
import { NgIf } from '@angular/common';
import IClientExercise from '../../interfaces/client_exercise';
import { ITrainingExercise } from '../../interfaces/training_exercise';

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
  exercises!: ITrainingExercise[];
  @ViewChild('place', {read: ViewContainerRef}) placeContainer!: ViewContainerRef;

  constructor() {
  }

  ngOnInit(): void {
  }

  addExercise(): void {
    // создаем новый экземпляр упражнения
    const newTrainingExercise: ITrainingExercise = {};
    this.placeContainer.createComponent<TrainingExerciseItemComponent>(TrainingExerciseItemComponent);
    this.exercises.push(newTrainingExercise)
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.exercises.forEach((exerciseFromGroup: any) => {
    //   this.compRef = this.place.createComponent<TrainingExerciseItemComponent>(TrainingExerciseItemComponent);
    // })
  }
}
