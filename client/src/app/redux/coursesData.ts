import { createSlice } from "@reduxjs/toolkit";

const coursesDataSlice = createSlice({
  name: "coursesData",
  initialState: [],
  reducers: {
    setCoursesData: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCoursesData } = coursesDataSlice.actions;
export default coursesDataSlice.reducer;
