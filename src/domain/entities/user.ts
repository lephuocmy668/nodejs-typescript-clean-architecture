import { Organization } from './organization';

export interface User {
  id?: string;
  name: string;
  description: string;
  email: string;
  organization?: Organization;
  organizationID: string;
}
