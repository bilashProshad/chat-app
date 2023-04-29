import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notification: [],
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.notification = [action.payload, ...state.notification];
    },
  },
});

export const { setNotification } = notificationSlice.actions;

export const notificationReducer = notificationSlice.reducer;
