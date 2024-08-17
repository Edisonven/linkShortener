import { configureStore } from "@reduxjs/toolkit";
import { registerReducer, loginReducer } from "../features/users/usersSlice.js";
import { emailRegex } from "../features/regex/regexSlice.js";
import { userToken } from "../features/users/usersSlice.js";

export const store = configureStore({
  reducer: {
    registerReducer,
    loginReducer,
    emailRegex,
    userToken,
  },
});
