// mockData.ts

/** ---------------------
 * Type Definitions
 * ---------------------- */

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
  type: string;
  url: string;
  size: string;
  uploadedAt: string;
}

export interface Tender {
  id: string;
  tenderName: string;
  agencyName: string;
  referenceNumber: string;
  closingDays: number;
  documentPrice: number;
  stage:
    | 'under-preview'
    | 'payment-pending'
    | 'preparing-proposals'
    | 'reviewing-proposals'
    | 'submitted'
    | 'won';
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  responsibleMember: User;
  documents: Document[];
  createdAt: string;
  updatedAt: string;
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

export interface KPIData {
  totalTenders: number;
  activeTenders: number;
  wonTenders: number;
  totalValue: number;
  winRate: number;
  avgClosingDays: number;
}

/** ---------------------
 * Mock Data
 * ---------------------- */

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@company.com',
    avatar:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    role: 'Project Manager',
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@company.com',
    avatar:
      'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    role: 'Technical Lead',
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol@company.com',
    avatar:
      'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    role: 'Business Analyst',
  },
  {
    id: '4',
    name: 'David Wilson',
    email: 'david@company.com',
    avatar:
      'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    role: 'Financial Analyst',
  },
];

const mockDocuments: Document[] = [
  {
    id: '1',
    name: 'RFP_Document.pdf',
    type: 'RFP',
    url: '#',
    size: '2.4 MB',
    uploadedAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Technical_Specs.pdf',
    type: 'Technical',
    url: '#',
    size: '1.8 MB',
    uploadedAt: '2024-01-16T14:15:00Z',
  },
  {
    id: '3',
    name: 'Financial_Requirements.pdf',
    type: 'Financial',
    url: '#',
    size: '0.9 MB',
    uploadedAt: '2024-01-17T09:45:00Z',
  },
];

export const mockTenders: Tender[] = [
  {
    id: '1',
    tenderName: 'Digital Infrastructure Modernization',
    agencyName: 'Department of Technology',
    referenceNumber: 'DT-2024-001',
    closingDays: 15,
    documentPrice: 500,
    stage: 'under-preview',
    priority: 'high',
    tags: ['Infrastructure', 'Digital', 'Priority'],
    responsibleMember: mockUsers[0],
    documents: mockDocuments,
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-20T16:30:00Z',
  },
  {
    id: '2',
    tenderName: 'Cloud Migration Services',
    agencyName: 'Ministry of Finance',
    referenceNumber: 'MF-2024-012',
    closingDays: 8,
    documentPrice: 750,
    stage: 'payment-pending',
    priority: 'high',
    tags: ['Cloud', 'Migration', 'Urgent'],
    responsibleMember: mockUsers[1],
    documents: mockDocuments,
    createdAt: '2024-01-12T09:15:00Z',
    updatedAt: '2024-01-21T11:20:00Z',
  },
  {
    id: '3',
    tenderName: 'Software Development Framework',
    agencyName: 'Education Authority',
    referenceNumber: 'EA-2024-007',
    closingDays: 22,
    documentPrice: 300,
    stage: 'preparing-proposals',
    priority: 'medium',
    tags: ['Development', 'Framework', 'Education'],
    responsibleMember: mockUsers[2],
    documents: mockDocuments,
    createdAt: '2024-01-08T14:30:00Z',
    updatedAt: '2024-01-22T10:45:00Z',
  },
  {
    id: '4',
    tenderName: 'Cybersecurity Assessment',
    agencyName: 'Defense Department',
    referenceNumber: 'DD-2024-003',
    closingDays: 5,
    documentPrice: 1000,
    stage: 'reviewing-proposals',
    priority: 'high',
    tags: ['Security', 'Assessment', 'Defense'],
    responsibleMember: mockUsers[3],
    documents: mockDocuments,
    createdAt: '2024-01-05T11:00:00Z',
    updatedAt: '2024-01-23T15:10:00Z',
  },
  {
    id: '5',
    tenderName: 'Data Analytics Platform',
    agencyName: 'Health Services',
    referenceNumber: 'HS-2024-015',
    closingDays: 30,
    documentPrice: 450,
    stage: 'submitted',
    priority: 'medium',
    tags: ['Analytics', 'Platform', 'Health'],
    responsibleMember: mockUsers[0],
    documents: mockDocuments,
    createdAt: '2024-01-03T13:45:00Z',
    updatedAt: '2024-01-24T09:30:00Z',
  },
  {
    id: '6',
    tenderName: 'Mobile Application Suite',
    agencyName: 'Transportation Bureau',
    referenceNumber: 'TB-2024-009',
    closingDays: 45,
    documentPrice: 200,
    stage: 'won',
    priority: 'low',
    tags: ['Mobile', 'Application', 'Transport'],
    responsibleMember: mockUsers[1],
    documents: mockDocuments,
    createdAt: '2024-01-01T08:30:00Z',
    updatedAt: '2024-01-25T12:15:00Z',
  },
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Alice Johnson',
    userAvatar:
      'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    message:
      "I've reviewed the technical requirements. We need to clarify the infrastructure specs.",
    timestamp: '2024-01-25T10:15:00Z',
    tenderId: '1',
  },
  {
    id: '2',
    userId: '2',
    userName: 'Bob Smith',
    userAvatar:
      'https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    message:
      "Agreed. I'll reach out to the client for additional technical documentation.",
    timestamp: '2024-01-25T10:20:00Z',
    tenderId: '1',
  },
  {
    id: '3',
    userId: '3',
    userName: 'Carol Davis',
    userAvatar:
      'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    message:
      'The financial proposal is ready for review. Please check the pricing structure.',
    timestamp: '2024-01-25T11:30:00Z',
    tenderId: '4',
  },
];

export const mockKPIData: KPIData = {
  totalTenders: 24,
  activeTenders: 18,
  wonTenders: 6,
  totalValue: 2450000,
  winRate: 25.5,
  avgClosingDays: 21,
};
