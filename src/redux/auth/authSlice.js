import { createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "../../services/authService";

const initialState = {
    user: null,
    isAdmin: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload.user;
            state.isAdmin = action.payload?.role === "admin";
        },
        logout: (state) =>{
            state.user = null;
            state.isAdmin = false;
            logoutUser();
        }
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;