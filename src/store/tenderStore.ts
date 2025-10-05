import { create } from 'zustand';
import { Tender, User } from '../types/tender';
import { TenderState } from '../types/store';
import { mockTenders, mockKPIData, mockUsers } from '../data/mockData';

// Helper function to get unique tags
const getAvailableTags = (tenders: Tender[]): string[] => {
  const allTags = tenders.flatMap(tender => tender.tags);
  return Array.from(new Set(allTags));
};

// Helper function to get available users
const getAvailableUsers = (users: User[]): User[] => {
  return users;
};

export const useTenderStore = create<TenderState>((set) => ({
  // Initial State
  tenders: mockTenders,
  kpiData: mockKPIData,
  availableTags: getAvailableTags(mockTenders),
  availableUsers: getAvailableUsers(mockUsers),

  // Actions
  changeTenderStage: (tenderId, newStage, action, responsibleMember) => {
    // Update tender stage and responsible member
    set(state => ({
      tenders: state.tenders.map(tender =>
        tender.id === tenderId
          ? { ...tender, stage: newStage, responsibleMember, updatedAt: new Date().toISOString() }
          : tender
      )
    }));
  },
}));


