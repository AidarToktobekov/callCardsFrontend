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
      const { data: profile } = await axiosApi.put(
        `/users/${userMutation?.id}`,
        userMutation
      );

      return profile;
    } catch (e) {
      throw new Error(e);
    }
  }
);

export const checkInSeniorSpec = createAsyncThunk(
  'user/checkInSeniorSpec',
  async ({ id, checkSenior }) => {
    try {
      const { data: res } = await axiosApi.post(
        `/users/${id}/${checkSenior ? 'check_out' : 'check_in'}`
      );

      return res;
    } catch (e) {
      throw new Error(e);
    }
  }
);

export const deleteUser = createAsyncThunk('user/deleteUser', async (user) => {
  try {
    const { data: res } = await axiosApi.delete(`/users/${user?.id}`);

    return res;
  } catch (e) {
    throw new Error(e);
  }
});
