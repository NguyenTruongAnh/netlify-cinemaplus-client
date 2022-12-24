import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name: "user",
    initialState: {
        currentUser: JSON.parse(localStorage.getItem("userCinema")) || null,
        isFetching: false,
        error: false,
        success: false,
    },
    reducers: {
        loginStart: (state, action) => {
            state.isFetching = true;
            state.error = false;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.error = false;
            state.currentUser = action.payload;
        },
        loginFailure: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
        },

        logout: (state) => {
            state.isFetching = false;
            state.error = false;
            state.success = false;
            state.currentUser = null;
        },

        updateStart: (state, action) => {
            state.isFetching = true;
            state.error = false;
            state.success = false;
        },
        updateSuccess: (state, action) => {
            state.isFetching = false;
            state.error = false;
            state.success = true;
            state.currentUser = action.payload;
        },
        updateFailure: (state, action) => {
            state.isFetching = false;
            state.success = false;
            state.error = action.payload;
        }
    }
})
