import { AbstractControl } from '@angular/forms';

export function amountValidator(control: AbstractControl) {
  console.log("VALUE: "+control.value);
  if (Number(control.value)<0) {
    return { amountIsValid: true };
  }
  return null;
}
