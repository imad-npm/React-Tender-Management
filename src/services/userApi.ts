import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { User } from '../types/tender';
import { mockDb } from '../utils/mockApiHandlers';

enum ApiTag {
  User = 'User',
}

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

type MockQueryArgs = {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: any;
};

const mockBaseQuery: BaseQueryFn<MockQueryArgs, unknown, { status: number; data: string }> = async ({ url, method }) => {
  await delay(500);

  const [resource] = url.split('/').filter(Boolean);

  try {
    switch (resource) {
      case 'users':
        if (method === 'GET') {
          return { data: mockDb.users.getAll() };
        }
        break;
    }
    return { error: { status: 404, data: 'Resource not found' } };
  } catch (error) {
    console.error('Mock API Error:', error);
    return { error: { status: 500, data: 'Internal Mock Server Error' } };
  }
};

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: mockBaseQuery,
  tagTypes: Object.values(ApiTag),
  endpoints: (builder) => ({
    getUsers: builder.query<User[], void>({
      query: () => ({ url: 'users', method: 'GET' }),
      providesTags: [ApiTag.User],
    }),
  }),
});

export const {
  useGetUsersQuery,
} = userApi;
