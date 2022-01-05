import { ImageFile } from './image-file';
import { Phone } from './phone';
export class Venue {
  id?: number;
  name?: string;
  description?: string;
  venueType?: string;
  foundationDate?: string;
  capacity?: number;
  openingHours?: string;
  phone?: Phone = new Phone();
  email?: string;
  address?: string;
  website?: string;
  latitude?: string;
  longitude?: string;
  youtube?: string;
  instagram?: string;
  facebook?: string;
  twitter?: string;
  imageFile: ImageFile;
}
