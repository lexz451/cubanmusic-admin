import { ImageFile } from './image-file';

export class Image {
  id?: string;
  title?: string;
  author?: string;
  date?: string;
  description?: string;
  imageFile?: ImageFile = new ImageFile();
  tags: string[] = [];
}
