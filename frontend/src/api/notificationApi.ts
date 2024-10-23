import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Response } from '../type/response.type'
import { Notification } from '../type/notification.type'

export const notificationApi = createApi({
  reducerPath: 'notificationApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:5000/api/',
  }),
  tagTypes: ['Notification'],
  endpoints: (build) => ({
    getNotification: build.query<Response<Notification[]>, void>({
      query: () => ({
        url: 'notification/notifications',
        method: 'GET',
      }),
      providesTags: ['Notification'],
    }),
    deleteAllNotification: build.mutation<Response<null>, void>({
      query: () => ({
        url: 'notification/notifications',
        method: 'DELETE',
      }),
      invalidatesTags: ['Notification'],
    }),
  }),
})

export const { useGetNotificationQuery, useDeleteAllNotificationMutation } =
  notificationApi
