import { NgControl } from '@angular/forms';

export class ValidationControl {
  private _control: NgControl;

  constructor(control: NgControl) {
    this._control = control;
  }

  get validationMessages(): string[] {
    if (this._control.invalid) {
      const message = Object.keys(this._control.errors).map((key: string) => {
        const value = this._control.errors[key];
        switch (key) {
          case 'required':
            return 'El campo es requerido.';
          case 'coordinate':
            return 'El valor de la coordenada no es válido.';
          case 'pwdNotMatch':
            return 'Las contraseñas no coinciden.';
          case 'isNumber':
            return 'El valor del campo debe ser numérico.';
          case 'min':
            return `El valor del campo debe ser mayor que ${value}`;
          case 'max':
            return `El valor del campo debe ser menor que ${value}`;
          default:
            break;
        }
        return null;
      });
      return message;
    }
    return [];
  }
}
