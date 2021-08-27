import { Organization } from '@shared/models/organization';
import { Image } from '@shared/models/image';

export class Award {
  id?: number;
  title?: string;
  description?: string;
  image?: Image;
  country?: number;
  grantedBy?: Organization;
  categories?: string[];
}
