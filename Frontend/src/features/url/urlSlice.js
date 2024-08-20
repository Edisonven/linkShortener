import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shortUrl: "",
  longUrl: "",
  errors: {
    longUrl: "",
  },
};

export const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {
    setLongUrl: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    setLongUrlErrors: (state, action) => {
      state.errors[action.payload.field] = action.payload.error;
    },
    resetUrlErrors: (state) => {
      state.errors = {
        longUrl: "",
      };
    },
    resetUrlForm: (state) => {
      state.longUrl = "";
    },
  },
});

export const { setLongUrl, setLongUrlErrors, resetUrlErrors, resetUrlForm } =
  urlSlice.actions;

export const urls = urlSlice.reducer;
