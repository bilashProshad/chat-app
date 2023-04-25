import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: false,
  conversation: [],
  error: null,
};

const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    fetchConversationRequest: (state) => {
      state.loading = true;
    },
    fetchConversationSucccess: (state, action) => {
      state.loading = false;
      state.conversation = action.payload.messages;
      state.success = action.payload.success;
    },
    fetchConversationFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateConversation: (state, action) => {
      state.conversation.push(action.payload);
    },
    clearConversationError: (state) => {
      state.error = null;
    },
    clearConversationSuccess: (state) => {
      state.success = false;
    },
  },
});

export const {
  fetchConversationFail,
  fetchConversationRequest,
  fetchConversationSucccess,
  updateConversation,
  clearConversationError,
  clearConversationSuccess,
} = conversationSlice.actions;

export const conversationReducer = conversationSlice.reducer;
