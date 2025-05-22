/**
 * productApi
 * 
 * RTK Query API service to fetch product data from fakestoreapi.com
 * Exposes getProducts query hook.
 */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
  endpoints: (builder) => ({
    getProducts: builder.query<any[], void>({
      query: () => 'products',
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
