// reducer.ts
import { createReducer } from '@reduxjs/toolkit';
import { fetchAnomaliesRequest, fetchAnomaliesSuccess, fetchAnomaliesFailure } from './actions';
import { Anomaly } from '../assets/anomalydata';

interface AnomaliesState {
  anomalies: Anomaly[];
  loading: boolean;
  error: string | null;
}

const initialState: AnomaliesState = {
  anomalies: [],
  loading: false,
  error: null,
};

const anomaliesReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchAnomaliesRequest, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchAnomaliesSuccess, (state, action) => {
      state.loading = false;
      state.anomalies = action.payload;
    })
    .addCase(fetchAnomaliesFailure, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default anomaliesReducer;