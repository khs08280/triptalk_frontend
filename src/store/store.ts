import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import chatRoomReducer from "../features/auth/chatRoomSlice";
import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chatroom: chatRoomReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
