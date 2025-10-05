import { createApi, BaseQueryFn } from '@reduxjs/toolkit/query/react';
import { KPIData } from '../types/tender';
import { mockDb } from '../utils/mockApiHandlers';

enum ApiTag {
  KPIs = 'KPIs',
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
      case 'kpis':
        if (method === 'GET') {
          return { data: mockDb.kpis.get() };
        }
        break;
    }
    return { error: { status: 404, data: 'Resource not found' } };
  } catch (error) {
    console.error('Mock API Error:', error);
    return { error: { status: 500, data: 'Internal Mock Server Error' } };
  }
};

export const kpiApi = createApi({
  reducerPath: 'kpiApi',
  baseQuery: mockBaseQuery,
  tagTypes: Object.values(ApiTag),
  endpoints: (builder) => ({
    getKPIData: builder.query<KPIData, void>({
      query: () => ({ url: 'kpis', method: 'GET' }),
      providesTags: [ApiTag.KPIs],
    }),
  }),
});

export const {
  useGetKPIDataQuery,
} = kpiApi;
