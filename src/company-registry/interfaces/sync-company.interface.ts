import { ICompany } from './company.interface';

type PropsOmitted = 'profileUrl' | '__v' | '_id' | 'createdAt' | 'updatedAt';

export type ISyncCompany = Omit<ICompany, PropsOmitted>;
