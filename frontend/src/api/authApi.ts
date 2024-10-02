import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
      baseUrl: 'http://127.0.0.1:5000/api/',
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
          query: (userInfo) => ({
            url: 'user/login',
            method: 'POST',
            body: userInfo,
          }),
        }),
      }),
})

export const { useLoginMutation } = authApi
