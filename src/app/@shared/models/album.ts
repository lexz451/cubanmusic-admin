export class Album {
  id?: number;
  title?: string;
  description?: string;
  releasedDate?: string;
  recordLabel?: number;
  artists?: number[] = [];
  copyrightYear?: string;
  contributors?: number[] = [];
  image?: any;
}
