import { AbstractControl, ValidationErrors, Validator, NG_VALIDATORS } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[isNumber]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: IsNumberValidator,
      multi: true,
    },
  ],
})
export class IsNumberValidator implements Validator {
  onChange: () => void;

  validate(control: AbstractControl): ValidationErrors {
    const value = control.value;
    if (!value) return null;
    const number = parseInt(value);
    if (isNaN(number))
      return {
        isNumber: false,
      };
    return null;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onChange = fn;
  }
}
