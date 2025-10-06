import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Tender, User, TenderStage, Priority } from '../types/tender';

// Define API tags for caching
enum ApiTag {
  Tender = 'Tender',
}

export const tenderApi = createApi({
  reducerPath: 'tenderApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
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
    updateTender: builder.mutation<Tender, { id: string; stage?: TenderStage; responsibleMember?: User; priority?: Priority; tags?: string[] }>({
      query: ({ id, ...patch }) => ({
        url: `tenders/${id}`,
        method: 'PUT',
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