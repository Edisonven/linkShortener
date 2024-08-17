import { configureStore } from "@reduxjs/toolkit";
import {
  registerReducer,
  loginReducer,
  userToken,
  user,
} from "../features/users/usersSlice.js";
import { emailRegex } from "../features/regex/regexSlice.js";

export const store = configureStore({
  reducer: {
    registerReducer,
    loginReducer,
    emailRegex,
    userToken,
    user,
  },
});
