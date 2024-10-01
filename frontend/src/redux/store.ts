import { configureStore } from '@reduxjs/toolkit';
import anomaliesReducer from './reducer'; // Adjust the import according to your file structure

const store = configureStore({
  reducer: {
    anomalies: anomaliesReducer,
    // Add other reducers here if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;