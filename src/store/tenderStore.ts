import { create } from 'zustand';
import { ChatMessage, Tender, User } from '../types/tender';
import { TenderState } from '../types/store';
import { mockTenders, mockKPIData, mockChatMessages, mockUsers } from '../data/mockData';

// Helper function to get unique tags
const getAvailableTags = (tenders: Tender[]): string[] => {
  const allTags = tenders.flatMap(tender => tender.tags);
  return Array.from(new Set(allTags));
};

// Helper function to get available users
const getAvailableUsers = (users: User[]): User[] => {
  return users;
};

export const useTenderStore = create<TenderState>((set, get) => ({
  // Initial State
  tenders: mockTenders,
  chatMessages: mockChatMessages,
  filters: {
    search: '',
    stages: [],
    users: [],
    priorities: [],
    tags: [],
    dateRange: { start: '', end: '' }
  },
  kpiData: mockKPIData,
  availableTags: getAvailableTags(mockTenders),
  availableUsers: getAvailableUsers(mockUsers),
  selectedTenderForPreview: null,
  selectedTenderForChat: null,
  selectedTenderForAction: null,

  // Actions
  setFilters: (newFilters) => set({ filters: newFilters }),

  sendMessage: (tenderId, message) => {
    const currentUser = mockUsers[0]; // Assuming first user is current user
    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.name,
      userAvatar: currentUser.avatar,
      message,
      timestamp: new Date().toISOString(),
      tenderId
    };
    set(state => ({ chatMessages: [...state.chatMessages, newMessage] }));
  },

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

  setSelectedTenderForPreview: (tender) => set({ selectedTenderForPreview: tender }),
  setSelectedTenderForChat: (tender) => set({ selectedTenderForChat: tender }),
  setSelectedTenderForAction: (tender) => set({ selectedTenderForAction: tender }),
}));

// Selector for filtered tenders
export const useFilteredTenders = () => {
  const { tenders, filters } = useTenderStore();

  return tenders.filter(tender => {
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch =
        tender.tenderName.toLowerCase().includes(searchLower) ||
        tender.agencyName.toLowerCase().includes(searchLower) ||
        tender.referenceNumber.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }
    if (filters.stages.length > 0 && !filters.stages.includes(tender.stage)) {
      return false;
    }
    if (filters.priorities.length > 0 && !filters.priorities.includes(tender.priority)) {
      return false;
    }
    if (filters.tags.length > 0 && !filters.tags.some(tag => tender.tags.includes(tag))) {
      return false;
    }
    if (filters.users.length > 0 && !filters.users.includes(tender.responsibleMember.id)) {
      return false;
    }
    if (filters.dateRange.start && new Date(tender.createdAt) < new Date(filters.dateRange.start)) {
      return false;
    }
    if (filters.dateRange.end && new Date(tender.createdAt) > new Date(filters.dateRange.end)) {
      return false;
    }
    return true;
  });
};
