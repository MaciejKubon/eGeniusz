import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function timeValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

    if (!value) return null;
    return timeRegex.test(value) ? null : { invalidTime: true };
  };
}