import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import friendSlice from "./slices/friendSlice";
import currentFriendSlice from "./slices/currentFriend";
import messageSlice from "./slices/messageSlice";
const appStore = configureStore({
  reducer: {
    user: userSlice.reducer,
    friends: friendSlice.reducer,
    currentFriend: currentFriendSlice.reducer,
    messages: messageSlice.reducer,
  },
});

export default appStore;
