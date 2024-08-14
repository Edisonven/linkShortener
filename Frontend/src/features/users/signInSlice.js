import { createSlice } from "@reduxjs/toolkit";

const initialLoginState = {
  email: "",
  password: "",
  isLoggedIn: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState: initialLoginState,
  reducers: {},
});

export default loginSlice.reducer;
