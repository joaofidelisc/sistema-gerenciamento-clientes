import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: localStorage.getItem("users")
    ? JSON.parse(localStorage.getItem("users"))
    : [],
  currentUser: localStorage.getItem("currentUser")
    ? JSON.parse(localStorage.getItem("currentUser"))
    : [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser(state, action) {
      const infoUser = action.payload;
      state.currentUser.push({
        email: infoUser.email,
        password: infoUser.password,
      });
    },
    logoutUser(state, action) {
      state.currentUser = [];
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
