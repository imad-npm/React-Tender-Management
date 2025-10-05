import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Tender } from '../types/tender';

enum ApiTag {
  Tags = 'Tags',
}

export const tagApi = createApi({
  reducerPath: 'tagApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  tagTypes: Object.values(ApiTag),
  endpoints: (builder) => ({
    getAvailableTags: builder.query<string[], void>({
      async queryFn(_arg, _queryApi, _extraOptions, fetchWithBase) {
        const result = await fetchWithBase('tenders');
        if (result.error) return { error: result.error };
        const tenders = result.data as Tender[];
        const allTags = tenders.flatMap(tender => tender.tags);
        const uniqueTags = Array.from(new Set(allTags));
        return { data: uniqueTags };
      },
      providesTags: [ApiTag.Tags],
    }),
  }),
});

export const {
  useGetAvailableTagsQuery,
} = tagApi;
