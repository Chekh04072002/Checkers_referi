import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    login: ''
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logIn: (state, action) => {
            state.login = action.payload;
        },
        logOut: (state, action) => {
            state.login = '';
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice;

