// actions.ts
import { createAction } from '@reduxjs/toolkit';
import { Anomaly } from '../assets/anomalydata';

export const fetchAnomaliesRequest = createAction('FETCH_ANOMALIES_REQUEST');
export const fetchAnomaliesSuccess = createAction<Anomaly[]>('FETCH_ANOMALIES_SUCCESS');
export const fetchAnomaliesFailure = createAction<string>('FETCH_ANOMALIES_FAILURE');