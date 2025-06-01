import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearneroverviewComponent } from './learneroverview.component';

describe('LearneroverviewComponent', () => {
  let component: LearneroverviewComponent;
  let fixture: ComponentFixture<LearneroverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LearneroverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearneroverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
