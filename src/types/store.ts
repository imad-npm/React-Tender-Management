
import { Tender, ChatMessage, TenderStage, KPIData, User } from './tender';

export interface TenderState {
  // State
  tenders: Tender[];
  chatMessages: ChatMessage[];
  kpiData: KPIData;
  availableTags: string[];
  availableUsers: User[];
  selectedTenderForPreview: Tender | null;
  selectedTenderForChat: Tender | null;
  selectedTenderForAction: Tender | null;

  // Actions
  sendMessage: (tenderId: string, message: string) => void;
  changeTenderStage: (tenderId: string, newStage: TenderStage, action: string, responsibleMember: User) => void;
  setSelectedTenderForPreview: (tender: Tender | null) => void;
  setSelectedTenderForChat: (tender: Tender | null) => void;
  setSelectedTenderForAction: (tender: Tender | null) => void;
}
