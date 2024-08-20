import { configureStore } from "@reduxjs/toolkit";
import {
  registerReducer,
  loginReducer,
  userToken,
} from "../features/users/usersSlice.js";
import { urls } from "../features/url/urlSlice.js";

export const store = configureStore({
  reducer: {
    registerReducer,
    loginReducer,
    userToken,
    urls,
  },
});
