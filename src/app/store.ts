import type { Action, ThunkAction } from "@reduxjs/toolkit"
import { configureStore } from "@reduxjs/toolkit"
import { api } from "./services/api"
import user from '../features/userSlice'
import { listenerMiddleware } from "../middleware/auth"



  export const store = configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      user
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware()
        .concat(api.middleware)
        .prepend(listenerMiddleware.middleware)
    }
  })


// Infer the type of `store`
export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"]
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
