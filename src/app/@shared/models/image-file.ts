export class ImageFile {
  filename?: string;
  filetype?: string;
  filedata?: string | ArrayBuffer;

  static toDataURL(file: ImageFile): string {
    return `data:${file.filetype};base64,${file.filedata}`;
  }

  static toBase64(result: string): string {
    const data = result.split(',')[1];
    return data;
  }
}
