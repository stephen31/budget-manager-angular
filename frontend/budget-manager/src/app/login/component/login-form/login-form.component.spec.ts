import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormComponent } from './login-form.component';
import { SharedMaterialModule } from '../../../shared-material/shared-material.module';
import { SharedModule } from '../../../shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        SharedModule,
        SharedMaterialModule,
      ],
      declarations: [ LoginFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the form when pending is true', () => {
    spyOn(component.loginForm, 'disable');
    component.pending = true;
    expect(component.loginForm.disable).toHaveBeenCalled();
  });

  it('should enable the form when pending is false', () => {
    spyOn(component.loginForm, 'enable');
    component.pending = false;
    expect(component.loginForm.enable).toHaveBeenCalled();
  });

  it('should create the form', () => {
    component.createForm();
    expect(component.loginForm).toBeDefined();
  });

  it('should return invalid when form is empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should emit a boolean when submit form', () => {
    component.createForm();
    spyOn(component.submitted, 'emit');
    component.submitLogin();
    expect(component.submitted.emit).toHaveBeenCalledWith({ username: '', password: '' });
  });
});
