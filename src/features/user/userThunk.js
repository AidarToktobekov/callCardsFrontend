import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { isAxiosError } from "axios";

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