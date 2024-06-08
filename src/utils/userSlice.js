import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null, // Change to object for better state management
  },
  reducers: {
    addUser: (state, action) => {
      state.userInfo = action.payload; // Set userInfo directly
    },
    removeUser: (state) => {
      state.userInfo = null; // Set userInfo to null on logout
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
