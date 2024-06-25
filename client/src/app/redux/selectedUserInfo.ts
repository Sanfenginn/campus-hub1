import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// 定义 state 的类型
type SelectedUserInfoState = {
  _id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  dob: Date;
  contact: {
    email: string;
    phone: string;
  };
  address: {
    houseNumber: string;
    street: string;
    suburb: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  account: string;
  role: {
    userType: string;
  };
};

// type SelectedUserInfoState = User[];

// const initialState: SelectedUserInfoState = [];

const initialState: SelectedUserInfoState = {
  _id: "",
  role: { userType: "" },
  name: { firstName: "", lastName: "" },
  dob: new Date(),
  account: "",
  contact: { phone: "", email: "" },
  address: {
    houseNumber: "",
    street: "",
    suburb: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  },
};

const selectedUserInfoSlice = createSlice({
  name: "selectedUserInfo",
  initialState,
  reducers: {
    setSelectedUserInfo: (
      state,
      action: PayloadAction<SelectedUserInfoState>
    ) => {
      return action.payload;
    },
  },
});

export const { setSelectedUserInfo } = selectedUserInfoSlice.actions;
export default selectedUserInfoSlice.reducer;
