export class Image {
  id?: number;
  title?: string;
  author?: string;
  date?: string;
  description?: string;
  filename?: string;
  filetype?: string;
  filedata?: File;
  tags: string[] = [];
}
