import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarUploadFormComponent } from './avatar-upload-form.component';

describe('AvatarUploadFormComponent', () => {
  let component: AvatarUploadFormComponent;
  let fixture: ComponentFixture<AvatarUploadFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvatarUploadFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarUploadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
