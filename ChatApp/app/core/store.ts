import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice"; // Припустимо, що ваш редуктор для чатів знаходиться у файлі chatSlice.ts

const rootReducer = {
  chat: chatReducer,
  // інші редуктори, якщо вони є
};

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
