import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 定义 state 的类型
type SelectedUsersIdsState = string[];

const initialState: SelectedUsersIdsState = [];

const selectedUsersIdsSlice = createSlice({
  name: "selectedUsersIds",
  initialState,
  reducers: {
    setSelectedUsersIds: (state, action: PayloadAction<string[]>) => {
      return action.payload;
    },
  },
});

export const { setSelectedUsersIds } = selectedUsersIdsSlice.actions;
export default selectedUsersIdsSlice.reducer;
