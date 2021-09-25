import { NgControl } from '@angular/forms';

export class ValidationControl {
  private _control: NgControl;

  constructor(control: NgControl) {
    this._control = control;
  }

  get validationMessages(): string[] {
    if (this._control.invalid) {
      const message = Object.keys(this._control.errors).map((key: string) => {
        switch (key) {
          case 'required':
            return 'El campo es requerido.';
          case 'coordinate':
            return 'El valor de la coordenada no es valido.';
          case 'pwdNotMatch':
            console.log(key);
            return 'Las contraseñas no coinciden.';
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
