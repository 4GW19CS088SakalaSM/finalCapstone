import { createSlice } from "@reduxjs/toolkit";

const AdminSlice = createSlice({
    name: 'admin',
    initialState: {
        loginStatus: false,
        loggedInAdmin: '',
        jwtToken: ''
    },
    reducers: {
        adminRegister: (state, action) => {
            console.log(action.payload);
            state.loggedInAdmin = '';
            state.loginStatus = false;
        },
        adminLogin: (state, action) => {
            console.log(action.payload);
            state.loggedInAdmin = action.payload.admin;
            state.jwtToken = action.payload.token;
            state.loginStatus = true;
        },
        adminUpdateProfile: (state, action) => {
            console.log(action.payload);
            state.loggedInAdmin = action.payload;
            state.loginStatus = true;
        },
        adminLogout: (state, action) => {
            console.log(action.payload);
            state.loggedInAdmin = '';
            state.loginStatus = false;
        }
    }
});

export default AdminSlice.reducer;

export const { adminLogin, adminLogout, adminRegister, adminUpdateProfile } = AdminSlice.actions;
