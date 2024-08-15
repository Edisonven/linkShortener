import { configureStore } from "@reduxjs/toolkit";
import {
  registerReducer,
  loginReducer,
} from "../features/users/signInSlice.js";
import { emailRegex } from "../features/regex/regexSlice.js";

export const store = configureStore({
  reducer: {
    registerReducer,
    loginReducer,
    emailRegex,
  },
});
