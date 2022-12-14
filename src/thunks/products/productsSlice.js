import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const apiSlice = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://3.141.23.218:5000' }),
  endpoints: (builder) => ({
    getProductList: builder.query({
      query: (keyword) => ({
        url: `/interview/keyword_search`,
        method: "POST",
        body: {
          "login_token": "INTERVIEW_SIMPLY2021",  // required(str): login token
          "search_phrase": keyword,                // required(str):
        }
      })

    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductListQuery } = apiSlice