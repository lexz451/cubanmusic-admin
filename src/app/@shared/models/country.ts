import { ISelectableItem } from './selectable-item';

export class Country implements ISelectableItem {
  id: string;
  name: string = '';
  iso2Code: string = '';
  phoneCode: string = '';
}
