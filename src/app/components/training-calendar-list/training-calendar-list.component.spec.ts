import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingCalendarListComponent } from './training-calendar-list.component';

describe('TrainingCalendarListComponent', () => {
  let component: TrainingCalendarListComponent;
  let fixture: ComponentFixture<TrainingCalendarListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingCalendarListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingCalendarListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
