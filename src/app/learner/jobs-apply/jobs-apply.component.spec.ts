import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsApplyComponent } from './jobs-apply.component';

describe('JobsApplyComponent', () => {
  let component: JobsApplyComponent;
  let fixture: ComponentFixture<JobsApplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsApplyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
