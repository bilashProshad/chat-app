import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { userInfoReducer } from "./slices/userInfoSlice";
import { chatsReducer } from "./slices/chatsSlice";
import { conversationReducer } from "./slices/conversationSlice";
import { currentChatReducer } from "./slices/currentChatSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    userInfo: userInfoReducer,
    chats: chatsReducer,
    currentChat: currentChatReducer,
    conversation: conversationReducer,
  },
});

export default store;
