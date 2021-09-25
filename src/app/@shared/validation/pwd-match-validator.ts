/* eslint-disable @angular-eslint/directive-selector */
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[pwdMatch]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PwdMatchValidator,
      multi: true,
    },
  ],
})
export class PwdMatchValidator implements Validator {
  @Input('pwdMatch') compareTo: string;

  onChange: () => void;

  validate(control: AbstractControl): ValidationErrors {
    const value = control.value;
    if (!value) return null;
    if (value !== this.compareTo) {
      return {
        pwdNotMatch: true,
      };
    }
    return null;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onChange = fn;
  }
}
