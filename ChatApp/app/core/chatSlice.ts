// chatSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Chat {
  id: string;
  name: string;
  messages: string[];
  creator: string;
}

interface ChatState {
  chats: Chat[];
}

const initialState: ChatState = {
  chats: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addChat: (state, action: PayloadAction<Chat>) => {
      state.chats.push(action.payload);
    },
    deleteChat: (state, action: PayloadAction<string>) => {
      state.chats = state.chats.filter((chat) => chat.id !== action.payload);
    },
    addMessage: (
      state,
      action: PayloadAction<{ chatId: string; message: string }>
    ) => {
      const chat = state.chats.find(
        (chat) => chat.id === action.payload.chatId
      );
      if (chat) {
        chat.messages.push(action.payload.message);
      }
    },
  },
});

export const { addChat, deleteChat, addMessage } = chatSlice.actions;
export default chatSlice.reducer;
