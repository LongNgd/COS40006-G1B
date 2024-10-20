import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Response } from '../type/response.type'

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:5000/api/',
  }),
  endpoints: (builder) => ({
    getNotification: builder.query<Response<>, >({
      query: () => ({
        url: 'user/login',
        method: 'POST',
      }),
    }),
  }),
})

export const {} = notificationApi
