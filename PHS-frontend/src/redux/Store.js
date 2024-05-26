// Store.js

import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./UserSlice";
import doctorReducer from "./DoctorSlice";
import adminReducer from "./AdminSlice";
import roleReducer from "./RoleSlice";
import adminReducerData from "./adminSliceData";

const store = configureStore({
  reducer: {
    user: UserReducer,
    doctor: doctorReducer,
    admin: adminReducer,
    role: roleReducer,
    adminData: adminReducerData,
  },
});

export default store;
