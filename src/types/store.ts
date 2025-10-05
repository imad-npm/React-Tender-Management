
import { Tender, KPIData, User, TenderStage } from './tender';

export interface TenderState {
  // State
  tenders: Tender[];
  kpiData: KPIData;
  availableTags: string[];
  availableUsers: User[];

  // Actions
  changeTenderStage: (tenderId: string, newStage: TenderStage, action: string, responsibleMember: User) => void;
}
