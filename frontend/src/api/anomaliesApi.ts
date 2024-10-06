import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Anomaly } from './anomaly.type'
import { Response } from './response.type'

export const anomaliesApi = createApi({
  reducerPath: 'anomaliesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:5000/api/',
  }),
  endpoints: (builder) => ({
    getAnomalies: builder.query<Response<Anomaly[]>, void>({
      query: () => ({ url: 'anomalies/getAnomalies', method: 'GET' }),
    }),
    filterByDate: builder.mutation<Response<Anomaly>, string>({
      query: (date) => ({
        url: `anomalies/filterByDate`,
        method: 'POST',
        body: date,
      }),
    }),
  }),
})

export const { useGetAnomaliesQuery, useFilterByDateMutation } = anomaliesApi
