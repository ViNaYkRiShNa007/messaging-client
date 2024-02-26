import { createSlice } from "@reduxjs/toolkit";
const currentFriendSlice = createSlice({
  name: "currentFriend",
  initialState: {},
  reducers: {
    getCurrentFriend: (state, action) => {
      return (state = action.payload);
    },
  },
});

export const currentFriendActions = currentFriendSlice.actions;
export default currentFriendSlice;
