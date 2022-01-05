import { ImageFile } from '@app/@shared/models/image-file';
export class Album {
  id?: string;
  name?: string;
  description?: string;
  releaseDate?: string;
  recordLabelId?: string;
  artists?: number[] = [];
  copyrightYear?: number;
  contributors?: string[] = [];
  imageFile?: ImageFile;
}
