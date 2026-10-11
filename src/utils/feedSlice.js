import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,

  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },

    removeFeed: (state, action) => {
      return null;
    },

    removeUserFromFeed: (state, action) => {
      const newArray = state.filter((user) => user._id !== action.payload); //here state is the data(array) that we already have in the redux store and action.payload is the current data being send using dispatch
      return newArray;
    },
  },
});

export const { addFeed, removeFeed , removeUserFromFeed} = feedSlice.actions;

export default feedSlice.reducer;
