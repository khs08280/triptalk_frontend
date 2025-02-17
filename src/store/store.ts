import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here if needed
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
