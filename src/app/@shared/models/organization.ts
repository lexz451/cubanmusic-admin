import { Phone } from '@shared/models/phone';
import { Point } from '@shared/models/point';

export class Organization {
  id?: number;
  name?: string;
  description?: string;
  phone?: Phone;
  email?: string;
  countryId?: number;
  point?: Point;
  website?: string;
  address?: string;
  collaborations?: number[] = [];
  affiliated?: number[] = [];
}
