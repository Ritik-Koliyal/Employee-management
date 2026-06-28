import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface Employee {
  _id: string;
  empID: string;
  firstName: string;
  role: string;
}

interface AuthState {
  employee: Employee | null;
  accessToken: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  employee: null,
  accessToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{
      employee: Employee,
      accessToken: string
    }>) => {
      state.employee = action.payload.employee;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true
    },

    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },

    setEmployee: (
      state,
      action: PayloadAction<Employee | null>
    ) => {

      state.employee = action.payload;
      state.isAuthenticated = true

    },

    logout: (state) => {
      state.employee = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    }
  }
})

export const {
  loginSuccess,
  logout,
  setAccessToken,
  setEmployee
} = authSlice.actions;

export default authSlice.reducer;