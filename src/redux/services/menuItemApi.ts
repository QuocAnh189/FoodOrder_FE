import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IMenuItem } from 'src/interfaces';
import { API_URL } from 'src/constants';

export const apiMenuItem = createApi({
  reducerPath: 'apiMenuItem',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL
  }),
  tagTypes: ['MenuItem'],
  keepUnusedDataFor: 20,
  endpoints: builder => ({
    getMenuItem: builder.query<IMenuItem, string | string[]>({
      query: id => ({
        url: `/menuitem/${id}`,
        method: 'GET'
      }),
      providesTags: ['MenuItem']
    }),

    getMenuItems: builder.query<IMenuItem[], void>({
      query: () => ({
        url: `/menuitem`,
        method: 'GET'
      }),
      providesTags: ['MenuItem']
    }),

    createMenuItem: builder.mutation<IMenuItem, IMenuItem>({
      query: data => ({
        url: `/menuitem`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['MenuItem']
    }),

    deleteImage: builder.mutation<any, string>({
      query: public_id => ({
        url: `/menuitem/deleteImage`,
        method: 'PATCH',
        body: { public_id }
      }),
      invalidatesTags: ['MenuItem']
    }),

    updateMenuItem: builder.mutation<IMenuItem, IMenuItem>({
      query: data => ({
        url: `/menuitem/${data._id}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['MenuItem']
    }),

    deleteMenuItem: builder.mutation<any, string>({
      query: id => ({
        url: `/menuitem/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['MenuItem']
    })
  })
});

export const {
  useGetMenuItemQuery,
  useGetMenuItemsQuery,
  useCreateMenuItemMutation,
  useUpdateMenuItemMutation,
  useDeleteMenuItemMutation,
  useDeleteImageMutation
} = apiMenuItem;
