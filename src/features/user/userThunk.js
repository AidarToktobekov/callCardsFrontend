import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';

export const signIn = createAsyncThunk(
    'user/signIn',
    async (user, { dispatch, rejectWithValue }) => {
        try {
            const req = await axiosApi.post('/sign-in', user);
            return await req.data;
        } catch (e) {
            throw new Error(e);
        }
    }
);