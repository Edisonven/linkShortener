import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shortUrl: "",
  longUrl: "",
};

export const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {
    setLongUrl: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
  },
});

export const { setLongUrl } = urlSlice.actions;

export const urls = urlSlice.reducer;
