import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shortUrl: "",
  longUrl: "",
  title: "",
  errors: {
    longUrl: "",
    title: "",
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
        title: "",
      };
    },
    resetUrlForm: (state) => {
      state.shortUrl = "";
      state.longUrl = "";
      state.title = "";
    },
    setUpdateUrlInfo: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
  },
});

export const {
  setLongUrl,
  setLongUrlErrors,
  resetUrlErrors,
  resetUrlForm,
  setUpdateUrlInfo,
} = urlSlice.actions;

export const urls = urlSlice.reducer;
