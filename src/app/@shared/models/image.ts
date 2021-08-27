import { Artist } from '@shared/models/artist';

export class Image {
  id?: number;
  title?: string;
  author?: string;
  date?: string;
  description?: string;
  artist?: Artist;
}
