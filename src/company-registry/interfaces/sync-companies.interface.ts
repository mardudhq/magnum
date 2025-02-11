import { ICompany } from './company.interface';

type PropsOmitted = 'profileUrl' | '__v' | '_id' | 'createdAt' | 'updatedAt';

export interface SyncCompanies extends Omit<ICompany, PropsOmitted> {}
