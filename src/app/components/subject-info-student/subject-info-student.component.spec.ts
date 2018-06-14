import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectInfoStudentComponent } from './subject-info-student.component';

describe('SubjectInfoStudentComponent', () => {
  let component: SubjectInfoStudentComponent;
  let fixture: ComponentFixture<SubjectInfoStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectInfoStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectInfoStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
