import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuscleGroupComponent } from './muscle-group.component';

describe('BodyPartsComponent', () => {
  let component: MuscleGroupComponent;
  let fixture: ComponentFixture<MuscleGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MuscleGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MuscleGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
