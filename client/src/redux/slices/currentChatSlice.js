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
  },
});

export const { setCurrentChat, resetCurrentChat } = currentChatSlice.actions;

export const currentChatReducer = currentChatSlice.reducer;
