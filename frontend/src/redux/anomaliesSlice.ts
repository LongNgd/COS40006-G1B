// reducer.ts
import { createSlice } from '@reduxjs/toolkit'
import { Anomaly } from '../assets/anomaly.type'

interface AnomaliesState {
  anomalies: Anomaly[]
  loading: boolean
  error: string | null
}

const initialState: AnomaliesState = {
  anomalies: [],
  loading: false,
  error: null,
}

const anomaliesSlice = createSlice({
  name: 'anomalies',
  initialState,
  reducers: {},
})

export default anomaliesSlice.reducer
