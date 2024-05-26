import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  adminProfileData: {
    name: "Admin User",
    email: "admin@gmail.com",
    contact: "7488956004",
    gender: "Male",
    role: "Admin",
    avatar: "/images/admin.png",
  },
};

const adminSliceData = createSlice({
  name: "adminData",
  initialState,
  reducers: {
    updateAdminProfileData(state, action) {
      state.adminProfileData = action.payload;
    },
  },
});

export const { updateAdminProfileData } = adminSliceData.actions;
export default adminSliceData.reducer;
