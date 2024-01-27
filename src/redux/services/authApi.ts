import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAuth } from '@/interfaces';
import { SignInType, SignUpType } from '@/types';

export const apiAuth = createApi({
  reducerPath: 'apiAuth',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.API_URL
  }),
  keepUnusedDataFor: 20,
  endpoints: builder => ({
    signIn: builder.mutation<IAuth, SignInType>({
      query: data => ({
        url: '/auth/signin',
        method: 'POST',
        body: data
      })
    }),
    signUp: builder.mutation<IAuth, SignUpType>({
      query: data => ({
        url: '/auth/signup',
        method: 'POST',
        body: data
      })
    }),
    signOut: builder.mutation<void, string>({
      query: userId => ({
        url: `/auth/${userId}`,
        method: 'POST'
      })
    })
  })
});

export const { useSignInMutation, useSignUpMutation, useSignOutMutation } =
  apiAuth;
