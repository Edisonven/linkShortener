import { configureStore } from "@reduxjs/toolkit";
import {
  registerReducer,
  loginReducer,
  setUser,
  userToken,
} from "../features/users/usersSlice.js";
import { emailRegex } from "../features/regex/regexSlice.js";

export const store = configureStore({
  reducer: {
    registerReducer,
    loginReducer,
    emailRegex,
    userToken,
    setUser,
  },
});
