import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "../features/users/signUpSlice";
import signInSlice from "../features/users/signInSlice";

export const store = configureStore({
  reducer: {
    signUpUser: signUpReducer,
    signInUser: signInSlice,
  },
});
