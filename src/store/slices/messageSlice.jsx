import { createSlice } from "@reduxjs/toolkit";
const messageSlice = createSlice({
  name: "messages",
  initialState: [],
  reducers: {
    getmessages: (state, action) => {
      return (state = action.payload);
    },
    addMessage: (state, action) => {
      return (state = [...state, action.payload]);
    },
  },
});

export const messageActions = messageSlice.actions;
export default messageSlice;
