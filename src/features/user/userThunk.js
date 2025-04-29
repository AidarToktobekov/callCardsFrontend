import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { isAxiosError } from 'axios';

export const login = createAsyncThunk(
  'user/login',
  async (user, { rejectWithValue }) => {
    try {
      const { data: req } = await axiosApi.post('/sign-in', user);
      return req.data;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 401) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  }
);

export const register = createAsyncThunk(
  'user/register',
  async (user, { rejectWithValue }) => {
    try {
      const { data: req } = await axiosApi.post('/sign-up', user);
      return req;
    } catch (e) {
      if (isAxiosError(e) && e.response && e.response.status === 400) {
        return rejectWithValue(e.response.data);
      }
      throw new Error(e);
    }
  }
);

export const getEmployees = createAsyncThunk('user/getEmployees', async () => {
  try {
    const { data: req } = await axiosApi.get('/users');
    return req;
  } catch (e) {
    throw new Error(e);
  }
});

export const getEmployee = createAsyncThunk('user/getEmployee', async (id) => {
  try {
    const { data: req } = await axiosApi.get(`/users/${id}`);
    return req;
  } catch (e) {
    throw new Error(e);
  }
});

export const editEmployees = createAsyncThunk(
  'user/editEmployees',
  async (userMutation) => {
    try {
      let password;
      if (userMutation.password) {
        password = await axiosApi.post('/reset_password', {
          newPassword: userMutation.password,
          id: userMutation.id,
        });
      }
      const { data: profile } = await axiosApi.put(`/edit_profile/${userMutation?.id}`);
      return { password: password?.data, profile };
    } catch (e) {
      throw new Error(e);
    }
  }
);
