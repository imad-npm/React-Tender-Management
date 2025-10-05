import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { Tender, User, TenderStage } from '../types/tender';
import { mockDb } from '../utils/mockApiHandlers';

// Define API tags for caching
enum ApiTag {
  Tender = 'Tender',
}

// Simulate a delay for API calls
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

// Type for the arguments passed to mockBaseQuery
type MockQueryArgs = {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: any;
};

// Custom base query to simulate API calls with mock data
const mockBaseQuery: BaseQueryFn<MockQueryArgs, unknown, { status: number; data: string }> = async ({ url, method, body }) => {
  await delay(500); // Simulate network delay

  const [resource, id] = url.split('/').filter(Boolean);

  try {
    switch (resource) {
      case 'tenders':
        if (method === 'GET') {
          if (id) {
            const tender = mockDb.tenders.getById(id);
            return tender ? { data: tender } : { error: { status: 404, data: 'Tender not found' } };
          } else {
            return { data: mockDb.tenders.getAll() };
          }
        } else if (method === 'PATCH') {
          if (id) {
            const updatedTender = mockDb.tenders.patch(id, body);
            return updatedTender ? { data: updatedTender } : { error: { status: 404, data: 'Tender not found' } };
          } else {
            return { error: { status: 405, data: 'PATCH method not allowed on collection' } };
          }
        }
        break;
    }
    return { error: { status: 404, data: 'Resource not found' } };
  } catch (error) {
    console.error('Mock API Error:', error);
    return { error: { status: 500, data: 'Internal Mock Server Error' } };
  }
};

export const tenderApi = createApi({
  reducerPath: 'tenderApi',
  baseQuery: mockBaseQuery,
  tagTypes: Object.values(ApiTag), // Use all values from ApiTag enum
  endpoints: (builder) => ({
    getTenders: builder.query<Tender[], void>({
      query: () => ({ url: 'tenders', method: 'GET' }),
      providesTags: [ApiTag.Tender],
    }),
    getTenderById: builder.query<Tender, string>({
      query: (id) => ({ url: `tenders/${id}`, method: 'GET' }),
      providesTags: (result, error, id) => [{ type: ApiTag.Tender, id }],
    }),
    updateTender: builder.mutation<Tender, { id: string; stage?: TenderStage; responsibleMember?: User }>({
      query: ({ id, ...patch }) => ({
        url: `tenders/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: ApiTag.Tender, id },
        ApiTag.Tender, // Invalidate all tenders to update lists
        // Removed KPI and Tags invalidation as they are in separate APIs
      ],
    }),
  }),
});

export const {
  useGetTendersQuery,
  useGetTenderByIdQuery,
  useUpdateTenderMutation,
} = tenderApi;