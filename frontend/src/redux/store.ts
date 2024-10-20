import { configureStore } from '@reduxjs/toolkit'
import anomaliesReducer from './anomaliesSlice'
import { anomaliesApi } from '../api/anomaliesApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from '../api/authApi'
import { cameraApi } from '../api/cameraApi'
import { notificationApi } from '../api/notificationApi'

const store = configureStore({
  reducer: {
    anomalies: anomaliesReducer,
    [anomaliesApi.reducerPath]: anomaliesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [cameraApi.reducerPath]: cameraApi.reducer,
    [notificationApi.reducerPath]: notificationApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      anomaliesApi.middleware,
      authApi.middleware,
      cameraApi.middleware,
      notificationApi.middleware,
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)

export default store
