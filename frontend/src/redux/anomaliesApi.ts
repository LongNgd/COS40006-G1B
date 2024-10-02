import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Anomaly } from '../assets/anomalydata'

type AnomaliesResponse = {
  data: Anomaly[]
  success: boolean
}

export const anomaliesApi = createApi({
  reducerPath: 'anomaliesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:5000/api/',
  }),
  endpoints: (builder) => ({
    getAnomalies: builder.query<AnomaliesResponse, void>({
      query: () => ({ url: 'anomalies/getAnomalies', method: 'GET' }),
    }),
  }),
})

export const { useGetAnomaliesQuery } = anomaliesApi
