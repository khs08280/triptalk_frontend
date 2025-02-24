// src/store/chatRoomSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatRoom } from "@/api/ChatApi";

interface ChatRoomState {
  currentChatRoom: ChatRoom | null;
  isChatRoomOpen: boolean;
}

const initialState: ChatRoomState = {
  currentChatRoom: null,
  isChatRoomOpen: true,
};

const chatRoomSlice = createSlice({
  name: "chatRoom",
  initialState,
  reducers: {
    setCurrentChatRoom: (state, action: PayloadAction<ChatRoom | null>) => {
      state.currentChatRoom = action.payload;
    },
    updateCurrentChatRoom: (
      state,
      action: PayloadAction<Partial<ChatRoom>>,
    ) => {
      if (state.currentChatRoom) {
        state.currentChatRoom = { ...state.currentChatRoom, ...action.payload };
      }
    },
    clearCurrentChatRoom: (state) => {
      state.currentChatRoom = null;
    },
    toggleChatRoomOpen: (state) => {
      state.isChatRoomOpen = !state.isChatRoomOpen;
    },
  },
});

export const {
  setCurrentChatRoom,
  updateCurrentChatRoom,
  clearCurrentChatRoom,
  toggleChatRoomOpen,
} = chatRoomSlice.actions;
export default chatRoomSlice.reducer;
