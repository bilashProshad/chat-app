import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  avatar: "",
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.name = action.payload;
    },
    setAvatar: (state, action) => {
      state.avatar = action.payload;
    },
  },
});

export const { setAvatar, setUsername } = userInfoSlice.actions;

export const userInfoReducer = userInfoSlice.reducer;
