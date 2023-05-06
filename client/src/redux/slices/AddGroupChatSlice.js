import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: false,
  newChat: null,
  error: null,
};

const addGroupChatSlice = createSlice({
  name: "addGroupChat",
  initialState,
  reducers: {
    addGroupChatRequest: (state) => {
      state.loading = true;
    },
    addGroupChatSuccess: (state, action) => {
      state.loading = false;
      state.newChat = action.payload.chat;
      state.success = action.payload.success;
    },
    addGroupChatFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearAddGroupChatError: (state) => {
      state.error = null;
    },
    resetAddGroupChat: (state) => {
      state.newChat = null;
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
});

export const {
  addGroupChatRequest,
  addGroupChatSuccess,
  addGroupChatFail,
  clearAddGroupChatError,
  resetAddGroupChat,
} = addGroupChatSlice.actions;

export const addGroupChatReducer = addGroupChatSlice.reducer;
