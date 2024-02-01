import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ICategory } from 'src/interfaces';
import { API_URL } from 'src/constants/api';

export const apiCategory = createApi({
  reducerPath: 'apiCategory',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL
  }),
  tagTypes: ['Category'],
  keepUnusedDataFor: 20,
  endpoints: builder => ({
    getCategory: builder.query<ICategory, string>({
      query: id => ({
        url: `/category/${id}`,
        method: 'GET'
      }),
      providesTags: ['Category']
    }),

    getCategories: builder.query<ICategory[], void>({
      query: () => ({
        url: `/category`,
        method: 'GET'
      }),
      providesTags: ['Category']
    }),

    createCategory: builder.mutation<ICategory, ICategory>({
      query: data => ({
        url: `/category`,
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['Category']
    }),

    updateCategory: builder.mutation<ICategory, ICategory>({
      query: data => ({
        url: `/category/${data._id}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: ['Category']
    }),

    deleteCategory: builder.mutation<void, string>({
      query: id => ({
        url: `/category/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Category']
    })
  })
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation
} = apiCategory;
