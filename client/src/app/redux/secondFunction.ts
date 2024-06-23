import { createSlice } from "@reduxjs/toolkit";

const secondFunctionSlice = createSlice({
  name: "secondFunction",
  initialState: {
    secondFunction: "",
  },
  reducers: {
    setSecondFunction: (state, action) => {
      state.secondFunction = action.payload;
    },
  },
});

export const { setSecondFunction } = secondFunctionSlice.actions;
export default secondFunctionSlice.reducer;
