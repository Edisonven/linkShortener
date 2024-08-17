import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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

const initialUserState = {
  name: "",
  email: "",
  status: "idle",
  error: null,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async (token) => {
  try {
    const response = await fetch("http://localhost:3000/users/user", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.user;
  } catch (error) {
    console.error(error.message);
  }
});

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.name = action.payload.name;
        state.email = action.payload.email;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
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
export const user = userSlice.reducer;
