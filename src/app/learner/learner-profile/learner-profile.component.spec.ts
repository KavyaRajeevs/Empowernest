import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnerProfileComponent } from './learner-profile.component';

describe('LearnerProfileComponent', () => {
  let component: LearnerProfileComponent;
  let fixture: ComponentFixture<LearnerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearnerProfileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
