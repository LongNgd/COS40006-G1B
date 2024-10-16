import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Anomaly } from '../type/anomaly.type'
import { Response } from '../type/response.type'
import { User } from '../type/user.type'

export const anomaliesApi = createApi({
  reducerPath: 'anomaliesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:5000/api/',
  }),
  endpoints: (builder) => ({
    getAnomalies: builder.query<Response<Anomaly[]>, void>({
      query: () => ({ url: 'anomalies/getAnomalies', method: 'GET' }),
    }),
    getAnomaliesByUser: builder.mutation<Response<Anomaly[]>, User>({
      query: (body) => ({
        url: `anomalies/getAnomaliesByUserId`,
        method: 'POST',
        body,
      }),
    }),
  }),
})

export const { useGetAnomaliesQuery, useGetAnomaliesByUserMutation } = anomaliesApi
