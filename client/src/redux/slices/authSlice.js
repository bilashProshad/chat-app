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
    },
    getOtpFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // ---------------------------
    userAuthRequest: (state) => {
      state.loading = true;
    },
    userAuthSuccess: (state, action) => {
      state.loading = false;
    },
    userAuthFail: (state, action) => {
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  getOtpRequest,
  getOtpSuccess,
  getOtpFail,
  userAuthFail,
  userAuthRequest,
  userAuthSuccess,
} = authSlice.actions;

export const authReducer = authSlice.reducer;
