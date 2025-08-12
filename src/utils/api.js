// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const api = createApi({
//   reducerPath: 'api',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'https://fakestoreapi.com',
//     prepareHeaders: (headers, { getState }) => {
//       const token = getState().auth.token;
//       if (token) {
//         headers.set('authorization', `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     login: builder.mutation({
//       query: (credentials) => ({
//         url: '/auth/login',
//         method: 'POST',
//         body: credentials,
//       }),
//     }),
//     getProducts: builder.query({
//       query: () => '/products',
//     }),
//     getProduct: builder.query({
//       query: (id) => `/products/${id}`,
//     }),
//     getCategories: builder.query({
//       query: () => '/products/categories',
//     }),
//     getProductsByCategory: builder.query({
//       query: (category) => `/products/category/${category}`,
//     }),
//   }),
// });

// export const {
//   useLoginMutation,
//   useGetProductsQuery,
//   useGetProductQuery,
//   useGetCategoriesQuery,
//   useGetProductsByCategoryQuery,
// } = api;
