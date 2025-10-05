import { create } from 'zustand';
import { ChatMessage } from '../types/tender';
import { mockChatMessages, mockUsers } from '../data/mockData';

interface ChatState {
  chatMessages: ChatMessage[];
  sendMessage: (tenderId: string, message: string) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  chatMessages: mockChatMessages,
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
}));
