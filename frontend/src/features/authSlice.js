import { createSlice } from "@reduxjs/toolkit";

const loggedIn = localStorage.getItem("isLoggedIn") == "true";

const initialState = {
  isLoggedIn: loggedIn,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      localStorage.setItem("isLoggedIn", "true");
      state.isLoggedIn = true;
    },
    logout: (state, action) => {
      localStorage.setItem("isLoggedIn", "false");
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
