import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentChat: {},
};

const currentChatSlice = createSlice({
  name: "currentChat",
  initialState,
  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    resetCurrentChat: (state) => {
      state.currentChat = {};
    },
    addNewUser: (state, action) => {
      state.currentChat.users.push(action.payload);
    },
  },
});

export const { setCurrentChat, resetCurrentChat, addNewUser } =
  currentChatSlice.actions;

export const currentChatReducer = currentChatSlice.reducer;
