import { Artist } from '@shared/models/artist';

export class Group {
  id?: number;
  name?: string;
  additionalNames?: string;
  activeSince: number;
  activeUntil?: number;
  description?: string;
  country?: number;
  awards: number[] = [];
  collaborations: number[] = [];
  affiliation: number;
  label?: number;
  genres: number[] = [];
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
  members: Artist[] = [];
  albums: number[] = [];
}
