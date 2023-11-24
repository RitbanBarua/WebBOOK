import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const loggedInStatusSlice = createSlice({
    name: "loggedInStatus",
    initialState: {
        isLoggedIn: Cookies.get('isLoggedIn') || false,
        user: Cookies.get('user') || null,
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;

            // Set cookie which expires in 1 Hour
            Cookies.set('isLoggedIn', true, { expires: 1 / 24 });
            Cookies.set('user', action.payload, { expires: 1 / 24 });
        },

        logout: (state) => {
            state.isLoggedIn = false;
            state.user = null;

            // Remove cookie on successful logout
            Cookies.remove('isLoggedIn');
            Cookies.remove('user');
        },
    },
});

export const { login, logout } = loggedInStatusSlice.actions;
export default loggedInStatusSlice.reducer;