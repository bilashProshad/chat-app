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
} = chatsSlice.actions;

export const chatsReducer = chatsSlice.reducer;
