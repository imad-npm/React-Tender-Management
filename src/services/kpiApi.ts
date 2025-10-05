import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { KPIData } from '../types/tender';

enum ApiTag {
  KPIs = 'KPIs',
}

export const kpiApi = createApi({
  reducerPath: 'kpiApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  tagTypes: Object.values(ApiTag),
  endpoints: (builder) => ({
    getKPIData: builder.query<KPIData, void>({
      query: () => 'kpis',
      providesTags: [ApiTag.KPIs],
    }),
  }),
});

export const {
  useGetKPIDataQuery,
} = kpiApi;
