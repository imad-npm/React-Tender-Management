import { create } from 'zustand';
import { ChatMessage, Tender, User, Filters } from '../types/tender';
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
  kpiData: mockKPIData,
  availableTags: getAvailableTags(mockTenders),
  availableUsers: getAvailableUsers(mockUsers),
  selectedTenderForPreview: null,
  selectedTenderForChat: null,
  selectedTenderForAction: null,

  // Actions
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


