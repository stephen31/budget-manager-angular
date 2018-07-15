import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from '../../../shared/pipes/same-password.directive';

@Component({
  selector: 'bm-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent {
  registerForm: FormGroup;

  @Input()
  errorMessage: String;

  @Output()
  submitted = new EventEmitter<any>();

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.registerForm.disable();
    } else {
      this.registerForm.enable();
    }
  }

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  get name() {
    return this.registerForm ? this.registerForm.get('name') : null;
  }

  get username() {
    return this.registerForm ? this.registerForm.get('username') : null;
  }

  get email() {
    return this.registerForm ? this.registerForm.get('email') : null;
  }

  get password() {
    return this.registerForm ? this.registerForm.get('password') : null;
  }

  get confirmPassword() {
    return this.registerForm ? this.registerForm.get('confirmPassword') : null;
  }

  createForm() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    }, {
      validator: PasswordValidation.matchPassword
    });
  }

  submitRegister() {
    if (this.registerForm.valid) {
      this.submitted.emit(this.registerForm.value);
    }
  }
}
