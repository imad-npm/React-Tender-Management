import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ChatMessage } from '../types/tender';

enum ApiTag {
  ChatMessages = 'ChatMessages',
}

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  tagTypes: Object.values(ApiTag),
  endpoints: (builder) => ({
    getChatMessages: builder.query<ChatMessage[], void>({
      query: () => 'chats',
      providesTags: [ApiTag.ChatMessages],
    }),
    sendChatMessage: builder.mutation<ChatMessage, ChatMessage>({
      query: (newMessage) => ({
        url: 'chats',
        method: 'POST',
        body: newMessage,
      }),
      invalidatesTags: [ApiTag.ChatMessages],
    }),
  }),
});

export const {
  useGetChatMessagesQuery,
  useSendChatMessageMutation,
} = chatApi;
