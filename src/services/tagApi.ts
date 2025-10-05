import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { mockDb } from '../utils/mockApiHandlers';

enum ApiTag {
  Tags = 'Tags',
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
      case 'tags':
        if (method === 'GET') {
          return { data: mockDb.tags.getAll() };
        }
        break;
    }
    return { error: { status: 404, data: 'Resource not found' } };
  } catch (error) {
    console.error('Mock API Error:', error);
    return { error: { status: 500, data: 'Internal Mock Server Error' } };
  }
};

export const tagApi = createApi({
  reducerPath: 'tagApi',
  baseQuery: mockBaseQuery,
  tagTypes: Object.values(ApiTag),
  endpoints: (builder) => ({
    getAvailableTags: builder.query<string[], void>({
      query: () => ({ url: 'tags', method: 'GET' }),
      providesTags: [ApiTag.Tags],
    }),
  }),
});

export const {
  useGetAvailableTagsQuery,
} = tagApi;
