import { Country } from './country';

export interface Location {
  id: number;
  address?: string;
  city?: string;
  state?: string;
  country?: Country;
}
