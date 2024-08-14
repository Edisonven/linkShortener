import { createSlice } from "@reduxjs/toolkit";

const initialRegisterState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  errors: {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
};

const registerSlice = createSlice({
  name: "register",
  initialState: initialRegisterState,
  reducers: {
    setUserData: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    setErrors: (state, action) => {
      state.errors[action.payload.field] = action.payload.error;
    },
    resetForm: (state) => {
      state.name = "";
      state.email = "";
      state.password = "";
      state.confirmPassword = "";
      state.errors = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      };
    },
  },
});

const initialLoginState = {
  username: "",
  password: "",
};

export const loginSlice = createSlice({
  name: "login",
  initialState: initialLoginState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
  },
});

export const { setUserData, setErrors, resetForm } = registerSlice.actions;

export const { setUsername, setPassword: setLoginPassword } =
  loginSlice.actions;

export const registerReducer = registerSlice.reducer;
export const loginReducer = loginSlice.reducer;
