export class Album {
  id?: number;
  title?: string;
  description?: string;
  releasedOn?: string;
  recordLabel?: number;
  artists?: number[] = [];
  copyrightYear?: string;
  contributors?: number[] = [];
}
