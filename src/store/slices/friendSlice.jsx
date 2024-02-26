import { createSlice } from "@reduxjs/toolkit";
const friendSlice = createSlice({
  name: "friends",
  initialState: [],
  reducers: {
    getFriends: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const friendActions = friendSlice.actions;
export default friendSlice;
