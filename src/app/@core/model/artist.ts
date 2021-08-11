import { JobTitle } from './job-title';

export interface Artist {
  id: number;
  name: string;
  alias: string;
  additionalNames: string[];
  birthDate: string;
  deathDate: string;
  birthPlace?: Location;
  deathPlace?: Location;
  residencePlace?: Location;
  gender?: number;
  jobTitle?: JobTitle;
  jobRoles?: string[];
  relatedTo?: Artist;
}
