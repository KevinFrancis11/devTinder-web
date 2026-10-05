import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,

  reducers: {
    addUser: (state, action) => {
      //initialy the state will be null as initialized above ("initialState: null")
      return action.payload; //add the data to the initialState
    },
    removeUser: (state, action) => {
      return null; //remove the data from the initialState
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
