import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientOpsComponent } from './client-ops.component';

describe('ClientOpsComponent', () => {
  let component: ClientOpsComponent;
  let fixture: ComponentFixture<ClientOpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ClientOpsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientOpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
