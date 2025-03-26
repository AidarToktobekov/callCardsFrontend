import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';

export const login = createAsyncThunk(
    'user/login',
    async (user) => {
        try {
            const {data: req} = await axiosApi.post('/sign-in', user);
            return req;
        } catch (e) {
            throw new Error(e);
        }
    }
);

export const register = createAsyncThunk(
    'user/register',
    async (user) => {
        try {
            const {data: req} = await axiosApi.post('/sign-up', user);
            return req;
        } catch (e) {
            throw new Error(e);
        }
    }
);