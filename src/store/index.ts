// src/store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { productApi } from './services/productApi';
import { userApi } from './services/userApi';
import selectedProductsReducer from './slices/selectedProductsSlice';
export const store = configureStore({
  reducer: {
    [productApi.reducerPath]: productApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
     selectedProducts: selectedProductsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productApi.middleware,
      userApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
