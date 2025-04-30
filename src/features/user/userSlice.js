import { createSlice } from '@reduxjs/toolkit';
import {
  checkInSeniorSpec,
  deleteUser,
  editEmployees,
  getEmployee, getEmployeeForEdit,
  getEmployees,
  login,
  register,
} from './userThunk';

const initialState = {
  user: null,
  loginLoading: false,
  loginError: null,
  registerError: null,
  registerLoading: false,
  employees: [
    {
      id: 'daw',
      full_name: 'Айдар',
      sip: '600',
    },
  ],
  employee: [],
  employeeLoading: null,
  employeeForEdit: [],
  employeeForEditLoading: false,
  employeesLoading: false,
  editEmployee: null,
  editEmployeeLoading: false,
  checkedSeniorLoading: false,
  deleteLoading: false,
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
        id: res.id,
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
    builder.addCase(getEmployee.pending, (state) => {
      state.employeeLoading = true;
    });
    builder.addCase(getEmployee.fulfilled, (state, { payload: employee }) => {
      state.employee = employee;
      state.employeeLoading = false;
    });
    builder.addCase(getEmployee.rejected, (state) => {
      state.employeeLoading = false;
    });
    builder.addCase(getEmployeeForEdit.pending, (state) => {
      state.employeeForEditLoading = true;
    });
    builder.addCase(getEmployeeForEdit.fulfilled, (state, { payload: employee }) => {
      state.employeeForEdit = employee;
      state.employeeForEditLoading = false;
    });
    builder.addCase(getEmployeeForEdit.rejected, (state) => {
      state.employeeForEditLoading = false;
    });
    builder.addCase(getEmployees.pending, (state) => {
      state.employeesLoading = true;
    });
    builder.addCase(getEmployees.fulfilled, (state, { payload: employees }) => {
      state.employees = employees;
      state.employeesLoading = false;
    });
    builder.addCase(getEmployees.rejected, (state) => {
      state.employeesLoading = false;
    });
    builder.addCase(editEmployees.pending, (state) => {
      state.editEmployeeLoading = true;
    });
    builder.addCase(editEmployees.fulfilled, (state, { payload: res }) => {
      state.editEmployee = res;
      state.editEmployeeLoading = false;
    });
    builder.addCase(editEmployees.rejected, (state) => {
      state.editEmployeeLoading = false;
    });
    builder.addCase(checkInSeniorSpec.pending, (state) => {
      state.checkedSeniorLoading = true;
    });
    builder.addCase(checkInSeniorSpec.fulfilled, (state) => {
      state.checkedSeniorLoading = false;
    });
    builder.addCase(checkInSeniorSpec.rejected, (state) => {
      state.checkedSeniorLoading = false;
    });
    builder.addCase(deleteUser.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(deleteUser.fulfilled, (state) => {
      state.deleteLoading = false;
    });
    builder.addCase(deleteUser.rejected, (state) => {
      state.deleteLoading = false;
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
    selectEmployee: (state) => state.employee,
    selectEmployeeLoading: (state) => state.employeeLoading,
    selectEditEmployee: (state) => state.editEmployee,
    selectEditEmployeeLoading: (state) => state.editEmployeeLoading,
    selectEmployeeForEdit: (state) => state.employeeForEdit,
    selectEmployeeForEditLoading: (state) => state.employeeForEditLoading,
    selectCheckedSeniorLoading: (state) => state.checkedSeniorLoading,
    selectDeleteLoading: (state) => state.deleteLoading,
  },
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
  selectEmployee,
  selectEmployeeLoading,
  selectEditEmployee,
  selectEditEmployeeLoading,
  selectCheckedSeniorLoading,
  selectDeleteLoading,
  selectEmployeeForEdit,
  selectEmployeeForEditLoading,
} = UsersSlice.selectors;
export const { logout } = UsersSlice.actions;
