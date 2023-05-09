import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  success: false,
  removed: false,
  added: false,
  updated: false,
  newUser: null,
  error: null,
};

const updateGroupSlice = createSlice({
  name: "updateGroup",
  initialState,
  reducers: {
    removeUserRequest: (state) => {
      state.loading = true;
    },
    removeUserSuccess: (state, action) => {
      state.loading = false;
      state.removed = action.payload.success;
    },
    removeUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addUserRequest: (state) => {
      state.loading = true;
    },
    addUserSuccess: (state, action) => {
      state.loading = false;
      state.added = action.payload.success;
    },
    addUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateNameRequest: (state) => {
      state.loading = true;
    },
    updateNameSuccess: (state, action) => {
      state.loading = false;
      state.updated = action.payload.success;
    },
    updateNameFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearUpdateGroupError: (state) => {
      state.error = null;
    },
    resetUpdateGroup: (state) => {
      state.error = null;
      state.loading = false;
      state.success = false;
      state.removed = false;
      state.added = false;
      state.updated = false;
    },
  },
});

export const {
  removeUserFail,
  removeUserRequest,
  removeUserSuccess,
  clearUpdateGroupError,
  resetUpdateGroup,
  addUserFail,
  addUserRequest,
  addUserSuccess,
  updateNameRequest,
  updateNameSuccess,
  updateNameFail,
} = updateGroupSlice.actions;

export const updateGroupReducer = updateGroupSlice.reducer;
