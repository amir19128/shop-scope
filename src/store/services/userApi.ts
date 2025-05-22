/**
 * userApi
 * 
 * RTK Query API service to fetch user data from fakestoreapi.com
 * Exposes getUsers and getUserById query hooks.
 */

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
  endpoints: (builder) => ({
    getUsers: builder.query<any[], void>({
      query: () => 'users',
    }),
    getUserById: builder.query<any, string>({
      query: (id) => `users/${id}`,
    }),
  }),
});

export const { useGetUsersQuery, useGetUserByIdQuery } = userApi;
