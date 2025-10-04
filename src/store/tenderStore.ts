import { create } from 'zustand';
import { Tender, Filters, ChatMessage, TenderStage, KPIData, User } from '../types/tender';
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

interface TenderState {
  // State
  tenders: Tender[];
  chatMessages: ChatMessage[];
  filters: Filters;
  kpiData: KPIData;
  availableTags: string[];
  availableUsers: User[];
  selectedTenderForPreview: Tender | null;
  selectedTenderForChat: Tender | null;
  selectedTenderForAction: Tender | null;

  // Actions
  setFilters: (filters: Filters) => void;
  sendMessage: (tenderId: string, message: string) => void;
  changeTenderStage: (tenderId: string, newStage: TenderStage, action: string) => void;
  setSelectedTenderForPreview: (tender: Tender | null) => void;
  setSelectedTenderForChat: (tender: Tender | null) => void;
  setSelectedTenderForAction: (tender: Tender | null) => void;
}

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

  changeTenderStage: (tenderId, newStage, action) => {
    // Update tender stage
    set(state => ({
      tenders: state.tenders.map(tender =>
        tender.id === tenderId
          ? { ...tender, stage: newStage, updatedAt: new Date().toISOString() }
          : tender
      )
    }));

    // Add a system message to chat
    const systemMessage: ChatMessage = {
      id: Date.now().toString(),
      userId: 'system',
      userName: 'System',
      userAvatar: '', // No avatar for system messages
      message: `Tender stage changed to "${newStage}" via action: "${action}".`,
      timestamp: new Date().toISOString(),
      tenderId
    };
    set(state => ({ chatMessages: [...state.chatMessages, systemMessage] }));
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
