import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.js';

export const getCardsReport = createAsyncThunk(
  'reports/getCardsReport',
  async ({date}) => {
    try {
      const { data: cardsReport } = await axiosApi.get(`/cards/report${date?.createdAt && date?.finishedAt ? `?start_date=${date.createdAt}&end_date=${date.finishedAt}` : ''}`);
      return cardsReport || [];
    } catch (error) {
      console.log(error);
    }
  }
);

export const getTreatmentReport = createAsyncThunk(
  'reports/getTreatmentReport',
  async ({date}) => {
    try {
      const { data: treatmentReport } = await axiosApi.get(
        `/cards/stats_by_reason${date?.createdAt && date?.finishedAt ? `?start_date=${date.createdAt}&end_date=${date.finishedAt}` : ''}`
      );
      return treatmentReport || [];
    } catch (error) {
      console.log(error);
    }
  }
);

export const getSolutionReport = createAsyncThunk(
  'reports/getSolutionReport',
  async ({date}) => {
    try {
      const { data: solutionReport } = await axiosApi.get(
        `/cards/stats_by_solution${date?.createdAt && date?.finishedAt ? `?start_date=${date.createdAt}&end_date=${date.finishedAt}` : ''}`
      );
      return solutionReport || [];
    } catch (error) {
      console.log(error);
    }
  }
);

export const getRepeatedCalls = createAsyncThunk(
  'reports/getRepeatedCalls',
  async ({ date, listPage, solutions, reasons, ls_abon }) => {
    try {
      const { data: repeatedCalls } = await axiosApi.get(
        `/cards/repeated_calls?start_date=${date.start}&end_date=${date.end}&page=${listPage}
            ${solutions?.length ? `&solution=${solutions}` : ''}
            ${reasons?.length ? `&reason=${reasons}` : ''}
            ${ls_abon ? `&ls_abon=${ls_abon}` : ''}
        `
      );
      return repeatedCalls || [];
    } catch (error) {
      console.log(error);
    }
  }
);

export const getCardsInactives = createAsyncThunk(
  'reports/getCardsInactives',
  async ({ date, reasons, solutions, employees, ls_abon }) => {
    try {
      const { data: cardsInactives } =
        await axiosApi.get(`/cards/inactives?start_date=${date?.createdAt}&end_date=${date?.finishedAt}
                    ${ls_abon ? `&ls_abon=${ls_abon}` : ''}
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
