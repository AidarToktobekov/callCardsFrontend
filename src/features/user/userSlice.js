import { createSlice } from '@reduxjs/toolkit';
import {login, register} from './userThunk';

const initialState = {
    user: {
        name: "Aidar",
        username: "Aidar",
        role: "admin",
        token: '32131212',
        id: '1',
    },
    loginLoading: false,
    loginError: null,
    registerError: null,
    registerLoading: false,
};

const UsersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.pending, (state) => {
            state.loginLoading = true;
        });
        builder.addCase(login.fulfilled, (state, { payload: res }) => {
            state.user = {
                username: res.username,
                name: res.full_name,
                role: res.role,
                sip: res.sip,
                phone_number: res.phone_number,
                token: res.token,
            };
            state.loginLoading = false;
        });
        builder.addCase(login.rejected, (state, {payload: error}) => {
            state.loginError = error;
            state.loginLoading = false;
        });
        builder.addCase(register.pending, (state) => {
            state.registerLoading = true;
        });
        builder.addCase(register.fulfilled, (state) => {
            state.registerLoading = false;
        });
        builder.addCase(register.rejected, (state,{payload: error}) => {
            state.registerError = error;
            state.registerLoading = false;
        });
    },
    selectors: {
        selectUser: (state) => state.user,
        selectLoginLoading: (state) => state.loginLoading,
        selectLoginError: (state) => state.loginError,
        selectRegisterError: (state) => state.registerError,
        selectRegisterLoading: (state) => state.registerLoading,
    }
});

export const userReducer = UsersSlice.reducer;
export const {
    selectUser,
    selectLoginLoading,
    selectLoginError,
    selectRegisterError,
    selectRegisterLoading
} = UsersSlice.selectors;
export const { logout } = UsersSlice.actions;