// thunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fetchAnomaliesRequest, fetchAnomaliesSuccess, fetchAnomaliesFailure } from './actions';
import { Anomaly } from '../assets/anomalydata';

export const fetchAnomalies = createAsyncThunk('anomalies/fetchAnomalies', async (_, { dispatch }) => {
  dispatch(fetchAnomaliesRequest());
  try {
    const response = await axios.get<Anomaly[]>('http://127.0.0.1:5000/api/anomalies/getAnomalies');
    dispatch(fetchAnomaliesSuccess(response.data));
  } catch (error) {
    dispatch(fetchAnomaliesFailure(error.message));
  }
});