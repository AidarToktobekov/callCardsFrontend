import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.js';

export const getCardsReport = createAsyncThunk(
  'reports/getCardsReport',
  async () => {
    try {
      const { data: cardsReport } = await axiosApi.get('/cards/report');
      return cardsReport || [];
    } catch (error) {
      console.log(error);
    }
  }
);

export const getTreatmentReport = createAsyncThunk(
  'reports/getTreatmentReport',
  async () => {
    try {
      const { data: treatmentReport } = await axiosApi.get(
        '/cards/stats_by_reason'
      );
      return treatmentReport || [];
    } catch (error) {
      console.log(error);
    }
  }
);

export const getSolutionReport = createAsyncThunk(
  'reports/getSolutionReport',
  async () => {
    try {
      const { data: solutionReport } = await axiosApi.get(
        '/cards/stats_by_solution'
      );
      return solutionReport || [];
    } catch (error) {
      console.log(error);
    }
  }
);

export const getRepeatedCalls = createAsyncThunk(
  'reports/getRepeatedCalls',
  async ({ date, listPage }) => {
    try {
      const { data: repeatedCalls } = await axiosApi.get(
        `/cards/repeated_calls?start_date=${date.start}&end_date=${date.end}&page=${listPage}`
      );
      return repeatedCalls || [];
    } catch (error) {
      console.log(error);
    }
  }
);

export const getCardsInactives = createAsyncThunk(
  'reports/getCardsInactives',
  async ({ date, reasons, solutions, employees }) => {
    try {
      const { data: cardsInactives } =
        await axiosApi.get(`/cards/inactives?start_date=${date?.createdAt}&end_date=${date?.finishedAt}
                    ${reasons?.length ? `&reason=${reasons}` : ''}
                    ${solutions?.length ? `&solution=${solutions}` : ''}
                    ${employees?.length ? `&sip=${employees}` : ''}
            `);
      return cardsInactives || [];
    } catch (error) {
      console.log(error);
    }
  }
);
