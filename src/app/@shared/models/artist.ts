import { Quote } from './quote';
import { JobTitle } from './job-title';
import { Location } from './location';

export class Artist {
  id?: number;
  name?: string;
  alias?: string;
  additionalNames?: string;
  birthDate?: string;
  deathDate?: string;
  activeSince: number;
  activeUntil?: number;
  birthPlace?: Location = new Location();
  deathPlace?: Location = new Location();
  residencePlace?: Location = new Location();
  gender?: string = 'OTHER';
  jobTitle?: JobTitle;
  jobRoles?: string;
  relatedTo?: Artist;
  description?: string;
  country?: number;
  nationality?: string;
  instruments?: number[] = [];
  awards: number[] = [];
  collaborations: number[] = [];
  affiliation: number;
  studyAt: number;
  labels: number[] = [];
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
  facebook?: string;
  twitter?: string;
  tiktok?: string;
  libOfCongress?: string;

  images: number[] = [];
  quotes: Quote[] = [];
}
