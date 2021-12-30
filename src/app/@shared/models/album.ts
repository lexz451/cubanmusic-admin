import { ImageFile } from '@app/@shared/models/image-file';
export class Album {
  id?: number;
  name?: string;
  description?: string;
  releaseDate?: string;
  recordLabel?: number;
  artists?: number[] = [];
  copyrightYear?: string;
  contributors?: number[] = [];
  imageFile?: ImageFile;
}
