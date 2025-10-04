export interface Tender {
  id: string;
  tenderName: string;
  agencyName: string;
  referenceNumber: string;
  closingDays: number;
  documentPrice: number;
  stage: TenderStage;
  priority: Priority;
  tags: string[];
  responsibleMember: User;
  documents: Document[];
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'RFP' | 'Technical' | 'Financial' | 'Attachment';
  url: string;
  size: string;
  uploadedAt: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  message: string;
  timestamp: string;
  tenderId: string;
}

export type TenderStage = 
  | 'under-preview'
  | 'payment-pending'
  | 'pending-preparing-proposals'
  | 'preparing-proposals'
  | 'reviewing-proposals'
  | 'pending-submitting'
  | 'submitted'
  | 'won'
  | 'lost'
  | 'canceled';

export type Priority = 'high' | 'medium' | 'low';

export interface Filters {
  search: string;
  stages: TenderStage[];
  users: string[];
  priorities: Priority[];
  tags: string[];
  dateRange: {
    start: string;
    end: string;
  };
}

export interface KPIData {
  totalTenders: number;
  activeTenders: number;
  wonTenders: number;
  totalValue: number;
  winRate: number;
  avgClosingDays: number;
}