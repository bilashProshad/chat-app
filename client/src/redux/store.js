import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { userInfoReducer } from "./slices/userInfoSlice";
import { chatsReducer } from "./slices/chatsSlice";
import { conversationReducer } from "./slices/conversationSlice";
import { currentChatReducer } from "./slices/currentChatSlice";
import { messageReducer } from "./slices/messageSlice";
import { searchUserReducer } from "./slices/searchUserSlice";
import { addToChatReducer } from "./slices/addToChatSlice";
import { notificationReducer } from "./slices/notificationSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    userInfo: userInfoReducer,
    chats: chatsReducer,
    currentChat: currentChatReducer,
    conversation: conversationReducer,
    message: messageReducer,
    searchUser: searchUserReducer,
    addToChat: addToChatReducer,
    notification: notificationReducer,
  },
});

export default store;
