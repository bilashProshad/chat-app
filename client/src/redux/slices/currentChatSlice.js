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
  },
});

export const { setCurrentChat } = currentChatSlice.actions;

export const currentChatReducer = currentChatSlice.reducer;
