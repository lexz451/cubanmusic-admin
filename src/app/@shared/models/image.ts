import { ImageFile } from "./image-file";

export class Image {
  id?: number;
  title?: string;
  author?: string;
  date?: string;
  description?: string;
  imageFile?: ImageFile;
  tags: string[] = [];
}
