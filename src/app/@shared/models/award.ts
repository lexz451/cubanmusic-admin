import { Organization } from '@shared/models/organization';
import { Image } from '@shared/models/image';

export class Award {
  id?: number;
  name?: string;
  description?: string;
  image?: Image;
  countryId?: number;
  grantedById?: number;
  categories?: string[];
}
