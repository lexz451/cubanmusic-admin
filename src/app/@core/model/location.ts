import { Country } from './country';

export class Location {
  id?: number;
  address?: string = '';
  city?: string = '';
  state?: string = '';
  country?: Country = new Country();
  constructor() {}
}
