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
    setRegisterData: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    setRegisterErrors: (state, action) => {
      state.errors[action.payload.field] = action.payload.error;
    },
    resetRegisterForm: (state) => {
      state.name = "";
      state.email = "";
      state.password = "";
      state.confirmPassword = "";
    },
    setResetRegisterErrors: (state) => {
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
  email: "",
  password: "",
  errors: {
    email: "",
    password: "",
  },
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialLoginState,
  reducers: {
    setLoginData: (state, action) => {
      state[action.payload.field] = action.payload.value;
    },
    setLoginErrors: (state, action) => {
      state.errors[action.payload.field] = action.payload.error;
    },
    resetLoginForm: (state) => {
      state.email = "";
      state.password = "";
    },
    setResetLoginErrors: (state) => {
      state.errors = {
        email: "",
        password: "",
      };
    },
  },
});

const initialTokenState = localStorage.getItem("token") || null;

const tokenSlice = createSlice({
  name: "token",
  initialState: { token: initialTokenState },
  reducers: {
    setUserToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    resetToken: (state) => {
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const {
  setRegisterData,
  setRegisterErrors,
  setResetRegisterErrors,
  resetRegisterForm,
} = registerSlice.actions;

export const {
  setLoginData,
  setLoginErrors,
  setResetLoginErrors,
  resetLoginForm,
} = loginSlice.actions;

export const { setUserToken, resetToken } = tokenSlice.actions;

export const registerReducer = registerSlice.reducer;
export const loginReducer = loginSlice.reducer;
export const userToken = tokenSlice.reducer;
