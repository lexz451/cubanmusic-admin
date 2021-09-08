import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { CoordinatesService, Direction } from 'angular-coordinates';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: '[coordinate]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CoordinateValidator,
      multi: true,
    },
  ],
})
export class CoordinateValidator implements Validator {
  _direction: Direction;

  constructor(private coordinatesService: CoordinatesService) {}

  @Input('coordinate')
  direction: Direction;

  onChange?: () => void;

  validate(control: AbstractControl): ValidationErrors {
    const value = control.value;
    if (!value) return null;
    if (!this.coordinatesService.isValidDigit(value, this._direction)) {
      return {
        coordinate: true,
      };
    }
    return null;
  }

  registerOnValidatorChange?(fn: () => void): void {
    this.onChange = fn;
  }
}
