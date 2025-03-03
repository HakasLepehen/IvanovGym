import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingExerciseItemComponent } from './training-exercise-item.component';

describe('TrainingExerciseItemComponent', () => {
  let component: TrainingExerciseItemComponent;
  let fixture: ComponentFixture<TrainingExerciseItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainingExerciseItemComponent]
    });
    fixture = TestBed.createComponent(TrainingExerciseItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
