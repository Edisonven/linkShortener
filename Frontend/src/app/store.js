import { configureStore } from "@reduxjs/toolkit";
import { registerReducer, loginReducer } from "../features/users/signInSlice.js";

export const store = configureStore({
  reducer: {
    registerReducer,
    loginReducer,
  },
});
