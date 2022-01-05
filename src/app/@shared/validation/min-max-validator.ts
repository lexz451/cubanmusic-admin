import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[minMax]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: MinMaxValidator,
      multi: true,
    },
  ],
})
export class MinMaxValidator implements Validator {
  @Input('minMax') minMaxObj: { min?: number; max?: number } = {
    min: 0,
    max: Infinity,
  };

  onChange: () => void;

  validate(control: AbstractControl): ValidationErrors {
    const value = parseInt(control.value);
    if (!value) return null;
    if (value < this.minMaxObj.min) {
      return {
        min: this.minMaxObj.min,
      };
    }
    if (value > this.minMaxObj.max) {
      return {
        max: this.minMaxObj.max,
      };
    }
    return null;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onChange = fn;
  }
}
