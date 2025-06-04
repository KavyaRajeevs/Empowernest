import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorApplicationsComponent } from './instructor-applications.component';

describe('InstructorApplicationsComponent', () => {
  let component: InstructorApplicationsComponent;
  let fixture: ComponentFixture<InstructorApplicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstructorApplicationsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstructorApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
