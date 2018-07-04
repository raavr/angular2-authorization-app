import { AbstractControl } from '@angular/forms';

export class ValidatorsService {

  static emailValidator(control) {
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalid-email': true };
    }
  }

  static passwordValidator(control) {
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { 'invalid-password': true };
    }
  }

  static passwordMatcher(control) {
    const pass = control.get('password');
    const confPass = control.get('passwordConf');
    if (!pass || !confPass) {
      return null;
    }
    return pass.value === confPass.value ? null : { 'nomatch-password': true };
  }
}