import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IUser, IUserInfo } from 'src/interfaces';
import { API_URL } from 'src/constants/api';

export const apiUser = createApi({
  reducerPath: 'apiUser',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL
  }),
  tagTypes: ['User', 'Infor'],
  keepUnusedDataFor: 20,
  endpoints: builder => ({
    getUser: builder.query<IUser, string | string[]>({
      query: userId => ({
        url: `/user/${userId}`,
        method: 'GET'
      }),
      providesTags: ['User']
    }),
    getUsers: builder.query<IUser[], void>({
      query: () => ({
        url: `/user`,
        method: 'GET'
      }),
      providesTags: ['User']
    }),

    deleteAvatar: builder.mutation<any, string>({
      query: public_id => ({
        url: `/user/deleteImage`,
        method: 'PATCH',
        body: { public_id }
      }),
      invalidatesTags: ['User']
    }),

    updateUser: builder.mutation<IUser, Partial<IUser>>({
      query: data => ({
        url: `/user/${data._id}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['User']
    }),

    updateUserInfo: builder.mutation<IUser, Partial<IUserInfo>>({
      query: data => ({
        url: `/user/info/${data._id}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['User', 'Infor']
    })
  })
});

export const {
  useGetUserQuery,
  useGetUsersQuery,
  useUpdateUserMutation,
  useUpdateUserInfoMutation,
  useDeleteAvatarMutation
} = apiUser;
