import { ISelectableItem } from './selectable-item';

export class Country implements ISelectableItem {
  id: number;
  name: string = '';
  iso2Code: string = '';
  iso3Code: string = '';
  phoneCode: string = '';
  numericCode: string = '';
  emoji: string = '';
}
