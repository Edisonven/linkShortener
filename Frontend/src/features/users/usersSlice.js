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
      state.errors = {
        email: "",
        password: "",
      };
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
const initialUserState = JSON.parse(localStorage.getItem("user")) || {
  name: "",
  email: "",
};

const tokenSlice = createSlice({
  name: "token",
  initialState: { token: initialTokenState, user: initialUserState },
  reducers: {
    setUserToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    setUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    resetToken: (state) => {
      state.token = null;
      state.user = { name: "", email: "" };
      localStorage.removeItem("token");
      localStorage.removeItem("user");
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

export const { setUserToken, resetToken, setUser } = tokenSlice.actions;

export const registerReducer = registerSlice.reducer;
export const loginReducer = loginSlice.reducer;
export const userToken = tokenSlice.reducer;
