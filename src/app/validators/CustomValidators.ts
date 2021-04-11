import { AbstractControl } from '@angular/forms';

export function amountValidator(control: AbstractControl) {
  if (Number(control.value)<0) {
    return { amountIsValid: true };
  }
  return null;
}
