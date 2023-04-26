import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  message: {},
  error: null,
  success: false,
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    sendMessageRequest: (state) => {
      state.loading = true;
    },
    sendMessageSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.success = action.payload.success;
    },
    sendMessageFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearSendMessageError: (state) => {
      state.error = null;
    },
    resetSendMessage: (state) => {
      state.success = false;
      state.message = {};
      state.error = false;
      state.loading = false;
    },
  },
});

export const {
  sendMessageFail,
  sendMessageRequest,
  sendMessageSuccess,
  clearSendMessageError,
  resetSendMessage,
} = messageSlice.actions;

export const messageReducer = messageSlice.reducer;
