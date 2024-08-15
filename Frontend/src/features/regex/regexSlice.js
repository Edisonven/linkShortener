import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  emailRegex: "/^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$/",
};

const regexSlice = createSlice({
  name: "regex",
  initialState,
  reducers: {
    setEmailRegex: (state, action) => {
      state.emailRegex = action.payload;
    },
  },
});

export const { setEmailRegex } = regexSlice.actions;

export const emailRegex = regexSlice.reducer;
