import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: null,
  otp: {
    email: "",
    hash: "",
  },
  loading: false,
  success: false,
  error: null,
  message: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getOtpRequest: (state) => {
      state.loading = true;
    },
    getOtpSuccess: (state, action) => {
      state.loading = false;
      state.otp.email = action.payload.email;
      state.otp.hash = action.payload.hash;
      state.success = true;
    },
    getOtpFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // ---------------------------
    verifyOtpRequest: (state) => {
      state.loading = true;
    },
    verifyOtpSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.success = action.payload.success;
      state.isAuth = action.payload.auth;
      state.otp.email = "";
      state.otp.hash = "";
    },
    verifyOtpFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // ------------------------------
    activateUserRequest: (state) => {
      state.loading = true;
    },
    activateUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuth = action.payload.auth;
      state.success = action.payload.success;
    },
    activateUserFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // ---------------------------------
    loadUserRequest: (state) => {
      state.loading = true;
    },
    loadUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuth = action.payload.auth;
      state.success = action.payload.success;
    },
    loadUserFail: (state, action) => {
      state.loading = false;
      // state.error = action.payload;
    },
    logoutSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuth = action.payload.auth;
      state.message = action.payload.message;
    },
    logoutFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // ------------------------------------
    clearError: (state) => {
      state.error = null;
    },
    clearAuthSuccess: (state) => {
      state.success = false;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
});

export const {
  getOtpRequest,
  getOtpSuccess,
  getOtpFail,
  verifyOtpRequest,
  verifyOtpSuccess,
  verifyOtpFail,
  activateUserRequest,
  activateUserSuccess,
  activateUserFail,
  loadUserRequest,
  loadUserSuccess,
  loadUserFail,
  logoutSuccess,
  logoutFail,
  clearError,
  clearAuthSuccess,
  clearMessage,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
