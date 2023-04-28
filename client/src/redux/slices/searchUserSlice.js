import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: false,
  users: [],
  error: null,
};

const searchUserSlice = createSlice({
  name: "searchUsers",
  initialState,
  reducers: {
    searchUserRequest: (state) => {
      state.loading = true;
    },
    searchUserSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
      state.success = action.payload.success;
    },
    searchUserFail: (state, action) => {
      state.error = action.payload;
    },
    clearSearchUserError: (state) => {
      state.error = null;
    },
    resetSearchUser: (state) => {
      state.users = [];
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
});

export const {
  searchUserFail,
  searchUserRequest,
  searchUserSuccess,
  clearSearchUserError,
  resetSearchUser,
} = searchUserSlice.actions;

export const searchUserReducer = searchUserSlice.reducer;
