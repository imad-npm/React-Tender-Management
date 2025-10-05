import { Tender, User, KPIData, TenderStage } from '../types/tender';
import { mockTenders as initialMockTenders, mockKPIData, mockUsers } from '../data/mockData';

// Internal mutable copies of mock data
let tenders: Tender[] = JSON.parse(JSON.stringify(initialMockTenders));
let kpiData: KPIData = JSON.parse(JSON.stringify(mockKPIData));
let users: User[] = JSON.parse(JSON.stringify(mockUsers));

// Helper function to get unique tags
const getUniqueTags = (tendersArray: Tender[]): string[] => {
  const allTags = tendersArray.flatMap(tender => tender.tags);
  return Array.from(new Set(allTags));
};

export const mockDb = {
  tenders: {
    getAll: (): Tender[] => {
      return tenders;
    },
    getById: (id: string): Tender | undefined => {
      return tenders.find(t => t.id === id);
    },
    patch: (id: string, updates: Partial<Tender>): Tender | undefined => {
      const tenderIndex = tenders.findIndex(t => t.id === id);
      if (tenderIndex > -1) {
        const updatedTender = {
          ...tenders[tenderIndex],
          ...updates,
          updatedAt: new Date().toISOString(), // Always update timestamp on change
        };
        tenders = [
          ...tenders.slice(0, tenderIndex),
          updatedTender,
          ...tenders.slice(tenderIndex + 1),
        ];
        return updatedTender;
      }
      return undefined;
    },
  },

  users: {
    getAll: (): User[] => {
      return users;
    },
  },

  kpis: {
    get: (): KPIData => {
      // In a real app, KPI data might be derived or fetched separately
      // For mock, we return the static mockKPIData
      return kpiData;
    },
  },

  tags: {
    getAll: (): string[] => {
      return getUniqueTags(tenders);
    },
  },

  // Add other resource handlers as needed
};