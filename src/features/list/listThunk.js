import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.js';

export const getList = createAsyncThunk(
  'list/getAll',
  async ({ listPage, date, reasons, solutions, employees, ls_abon }) => {
    try {
      const { data: list } = await axiosApi.get(
        `/cards?page=${listPage}&page_size=${100}
                    ${ls_abon ? `&ls_abon=${ls_abon}` : ''}
                    ${date?.createdAt && date?.finishedAt ? `&start_date=${date.createdAt}&end_date=${date.finishedAt}` : ''}
                    ${reasons?.length ? `&reason=${reasons}` : ''}
                    ${solutions?.length ? `&solution=${solutions}` : ''}
                    ${employees?.length ? `&sip=${employees}` : ''}
                    `
      );
      return list || [];
    } catch (error) {
      console.log(error);
    }
  }
);

export const getClient = createAsyncThunk('list/getClient', async (number) => {
  try {
    const { data: client } = await axiosApi.get(`/hydra_seeker/${number}`);

    return client;
  } catch (error) {
    throw new Error(error);
  }
});

export const createCard = createAsyncThunk(
  'list/createCard',
  async (cardMutation) => {
    try {
      const { data: card } = await axiosApi.post(
        '/cards/create_card',
        cardMutation
      );

      return card;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getReasons = createAsyncThunk('list/getReasons', async () => {
  try {
    const { data: reasons } = await axiosApi.get('actions_tree/reasons');

    return reasons;
  } catch (error) {
    throw new Error(error);
  }
});

export const getSolution = createAsyncThunk('list/getSolutions', async () => {
  try {
    const { data: solution } = await axiosApi.get('actions_tree/solutions');

    return solution;
  } catch (error) {
    throw new Error(error);
  }
});
