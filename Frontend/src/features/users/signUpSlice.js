import { createSlice } from "@reduxjs/toolkit";

const initialRegisterState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const registerSlice = createSlice({
  name: "register",
  initialState: initialRegisterState,
  reducers: {},
});

export default registerSlice.reducer;
