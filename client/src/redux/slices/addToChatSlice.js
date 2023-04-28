import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: false,
  newChat: null,
  error: null,
};

const addToChatSlice = createSlice({
  name: "addToChat",
  initialState,
  reducers: {
    addToChatRequest: (state) => {
      state.loading = true;
    },
    addToChatSuccess: (state, action) => {
      state.loading = false;
      state.newChat = action.payload.chat;
      state.success = action.payload.success;
    },
    addToChatFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearAddToChatError: (state) => {
      state.error = null;
    },
    resetAddToChat: (state) => {
      state.newChat = null;
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
});

export const {
  addToChatFail,
  addToChatRequest,
  addToChatSuccess,
  clearAddToChatError,
  resetAddToChat,
} = addToChatSlice.actions;

export const addToChatReducer = addToChatSlice.reducer;
