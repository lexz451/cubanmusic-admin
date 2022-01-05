import { ImageFile } from './image-file';
import { Artist } from '@shared/models/artist';

export class Group {
  id?: string;
  name?: string;
  additionalNames?: string;
  imageFile?: ImageFile;
  activeSince: number;
  activeUntil?: number;
  description?: string;
  country?: number;
  awardsIds: string[] = [];
  collaborations: number[] = [];
  organizationId: string;
  recordLabelId?: string;
  genresIds: string[] = [];
  email?: string;
  website?: string;
  isniCode?: string;
  spotify?: string;
  appleMusic?: string;
  soundCloud?: string;
  deezer?: string;
  youtube?: string;
  instagram?: string;
  viberate?: string;
  reverbNation?: string;
  facebook?: string;
  twitter?: string;
  tiktok?: string;
  libOfCongress?: string;
  membersIds: string[] = [];
  albumsIds: string[] = [];

  constructor(obj: any = {}) {
    Object.assign(this, obj);
  }
}
