import { JobTitle } from './job-title';
import { Location } from './location';

export class Artist {
  id?: number;
  name?: string;
  alias?: string;
  additionalNames?: string;
  birthDate?: string;
  deathDate?: string;
  birthPlace?: Location = new Location();
  deathPlace?: Location = new Location();
  residencePlace?: Location = new Location();
  gender?: number;
  jobTitle?: JobTitle;
  jobRoles?: string;
  relatedTo?: Artist;
  description?: string;
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

  constructor() {}
}
