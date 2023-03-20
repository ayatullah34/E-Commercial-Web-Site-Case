import { configureStore } from '@reduxjs/toolkit'
import eteration from './eterationSlice'

export const store = configureStore({
  reducer: { eteration },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})