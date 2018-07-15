import { ValidatorFn, AbstractControl } from '@angular/forms';

export class PasswordValidation {
  static matchPassword(control: AbstractControl) {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (password.value !== confirmPassword.value) {
      confirmPassword.setErrors({matchPassword: true});
    } else {
      // confirmPassword.setErrors({MatchPassword: null});
    }
  }
}

export function samePasswordValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    const samePassword = password === confirmPassword;
    return samePassword ? {'samePassword': samePassword} : null;
  };
}
