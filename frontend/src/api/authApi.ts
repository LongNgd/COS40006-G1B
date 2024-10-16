import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { UserRes, UserReq } from '../type/user.type'
import { Response } from '../type/response.type'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:5000/api/',
  }),
  endpoints: (builder) => ({
    login: builder.mutation<Response<UserRes>, UserReq>({
      query: (userInfo) => ({
        url: 'user/login',
        method: 'POST',
        body: userInfo,
      }),
    }),
  }),
})

export const { useLoginMutation } = authApi
