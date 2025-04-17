import { createSlice } from '@reduxjs/toolkit';
import {getEmployees, login, register} from './userThunk';

const initialState = {
  user: null,
  loginLoading: false,
  loginError: null,
  registerError: null,
  registerLoading: false,
  employees: [],
  employeesLoading: false,
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
      state.loginError = null;
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
    builder.addCase(login.rejected, (state, { payload: error }) => {
      state.loginError = error;
      state.loginLoading = false;
    });
    builder.addCase(register.pending, (state) => {
      state.registerLoading = true;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.registerLoading = false;
    });
    builder.addCase(register.rejected, (state, { payload: error }) => {
      state.registerError = error;
      state.registerLoading = false;
    });
    builder.addCase(getEmployees.pending, (state) => {
      state.employeesLoading = true;
    });
    builder.addCase(getEmployees.fulfilled, (state, {payload: employees}) => {
      state.employees = employees
      state.employeesLoading = false;
    });
    builder.addCase(getEmployees.rejected, (state) => {
      state.employeesLoading = false;
    });
  },
  selectors: {
    selectUser: (state) => state.user,
    selectLoginLoading: (state) => state.loginLoading,
    selectLoginError: (state) => state.loginError,
    selectRegisterError: (state) => state.registerError,
    selectRegisterLoading: (state) => state.registerLoading,
    selectEmployees: (state) => state.employees,
    selectEmployeesLoading: (state) => state.employeesLoading,
  }
});

export const userReducer = UsersSlice.reducer;
export const {
  selectUser,
  selectLoginLoading,
  selectLoginError,
  selectRegisterError,
  selectRegisterLoading,
  selectEmployees,
  selectEmployeesLoading,
} = UsersSlice.selectors;
export const { logout } = UsersSlice.actions;