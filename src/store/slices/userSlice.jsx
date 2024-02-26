import React from "react";
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: JSON.parse(localStorage.getItem("user")),
  reducers: {
    getUser: (state, action) => {
      return (state = action.payload);
    },
  },
});
export const userActions = userSlice.actions;
export default userSlice;
