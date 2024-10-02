import { configureStore } from '@reduxjs/toolkit'
import anomaliesReducer from './anomaliesSlice'
import { anomaliesApi } from './anomaliesApi'
import { setupListeners } from '@reduxjs/toolkit/query'
import { authApi } from './authApi'

const store = configureStore({
  reducer: {
    anomalies: anomaliesReducer,
    [anomaliesApi.reducerPath]: anomaliesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(anomaliesApi.middleware, authApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)

export default store
