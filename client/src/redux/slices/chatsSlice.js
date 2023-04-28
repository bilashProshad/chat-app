import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  chats: [],
  loading: false,
  success: false,
  error: null,
};

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    fetchAllChatRequest: (state) => {
      state.loading = true;
    },
    fetchAllChatSuccess: (state, action) => {
      state.loading = false;
      state.chats = action.payload.chats;
      state.success = action.payload.success;
    },
    fetchAllChatFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateChat: (state, action) => {
      state.chats = [action.payload, ...state.chats];
    },
    clearFetchAllChatError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchAllChatFail,
  fetchAllChatRequest,
  fetchAllChatSuccess,
  clearFetchAllChatError,
  updateChat,
} = chatsSlice.actions;

export const chatsReducer = chatsSlice.reducer;
