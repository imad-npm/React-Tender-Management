import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { tenderApi } from './../services/tenderApi';
import { userApi } from './../services/userApi';
import { kpiApi } from './../services/kpiApi';
import { tagApi } from './../services/tagApi';

export const store = configureStore({
  reducer: {
    [tenderApi.reducerPath]: tenderApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [kpiApi.reducerPath]: kpiApi.reducer,
    [tagApi.reducerPath]: tagApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(tenderApi.middleware)
      .concat(userApi.middleware)
      .concat(kpiApi.middleware)
      .concat(tagApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;