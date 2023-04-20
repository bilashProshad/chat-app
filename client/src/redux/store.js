import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { userInfoReducer } from "./slices/userInfoSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    userInfo: userInfoReducer,
  },
});

export default store;
