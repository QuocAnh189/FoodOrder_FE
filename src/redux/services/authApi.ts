import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAuth } from 'src/interfaces';
import { API_URL } from 'src/constants/api';
import { SignInType, SignUpType } from 'src/types';

export const apiAuth = createApi({
  reducerPath: 'apiAuth',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL
  }),
  keepUnusedDataFor: 20,
  endpoints: builder => ({
    signIn: builder.mutation<IAuth, SignInType>({
      query: data => ({
        url: '/auth/signin',
        method: 'POST',
        body: data
      }),
      transformResponse(data: any) {
        return data.data;
      }
    }),
    signUp: builder.mutation<IAuth, SignUpType>({
      query: data => ({
        url: '/auth/signup',
        method: 'POST',
        body: data
      }),
      transformResponse(data: any) {
        return data.data;
      }
    }),
    signOut: builder.mutation<void, string>({
      query: userId => ({
        url: `/auth/signout/${userId}`,
        method: 'POST'
      })
    })
  })
});

export const { useSignInMutation, useSignUpMutation, useSignOutMutation } =
  apiAuth;
