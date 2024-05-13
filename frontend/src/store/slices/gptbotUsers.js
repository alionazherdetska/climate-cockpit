import { createSlice } from "@reduxjs/toolkit";

export const gptbotUsers = createSlice({
  name: "gptbotUsers",
  initialState: { list: undefined },
  reducers: {
    setGptbotUsers: (state, action) => {
      state.list = action.payload;
    },
  },
});
export const { setGptbotUsers } = gptbotUsers.actions;
export default gptbotUsers.reducer;
