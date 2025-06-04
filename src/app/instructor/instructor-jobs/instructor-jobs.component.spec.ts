import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorJobsComponent } from './instructor-jobs.component';

describe('InstructorJobsComponent', () => {
  let component: InstructorJobsComponent;
  let fixture: ComponentFixture<InstructorJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorJobsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
