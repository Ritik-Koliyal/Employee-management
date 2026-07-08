import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  employee: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authLoading(state) {
      state.isLoading = true;
    },

    authFinished(state) {
      state.isLoading = false;
    },

    loginSuccess(state, action) {
      state.employee = action.payload.employee;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.isLoading = false;
    },

    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },

    setEmployee(state, action) {
      state.employee = action.payload;
      state.isAuthenticated = true;
    },

    logout(state) {
      state.employee = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },
});

export const {
  loginSuccess,
  logout,
  setAccessToken,
  setEmployee,
  authFinished,
  authLoading,
} = authSlice.actions;

export default authSlice.reducer;
