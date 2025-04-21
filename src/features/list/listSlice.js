import {createSlice} from "@reduxjs/toolkit";
import {createCard, getClient, getList, getReasons, getSolution} from "./listThunk.js";

const initialState = {
  list: {
    total_results: null,
    total_pages: null,
    result: [],
  },
  listLoading: false,
  createCardLoading: false,
  clients: [],
  clientsLoading: false,
  reasons: [],
  reasonsLoading: false,
  solutions: [],
  solutionsLoading: false,
};

const ListSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    resetClients: state => {
      state.clients = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getList.pending, (state) => {
      state.listLoading = true;
    });
    builder.addCase(getList.fulfilled, (state, { payload: list }) => {
      state.listLoading = false;
      state.list = list;
    });
    builder.addCase(getList.rejected, (state) => {
      state.listLoading = false;
    });
    builder.addCase(getClient.pending, (state) => {
      state.clientsLoading = true;
    });
    builder.addCase(getClient.fulfilled, (state, { payload: client }) => {
      state.clientsLoading = false;
      state.clients = client;
    });
    builder.addCase(getClient.rejected, (state) => {
      state.clientsLoading = false;
    });
    builder.addCase(getReasons.pending, (state) => {
      state.reasonsLoading = true;
    });
    builder.addCase(getReasons.fulfilled, (state, { payload: reasons }) => {
      state.reasonsLoading = false;
      state.reasons = reasons;
    });
    builder.addCase(getReasons.rejected, (state) => {
      state.reasonsLoading = false;
    });
    builder.addCase(getSolution.pending, (state) => {
      state.solutionsLoading = true;
    });
    builder.addCase(getSolution.fulfilled, (state, { payload: solution }) => {
      state.solutionsLoading = false;
      state.solutions = solution;
    });
    builder.addCase(getSolution.rejected, (state) => {
      state.solutionsLoading = false;
    });
    builder.addCase(createCard.pending, (state) => {
      state.createCardLoading = true;
    });
    builder.addCase(createCard.fulfilled, (state) => {
      state.createCardLoading = false;
    });
    builder.addCase(createCard.rejected, (state) => {
      state.createCardLoading = false;
    });
  },
  selectors: {
    selectList: state => state.list,
    selectListLoading: state => state.listLoading,
    selectClients: state => state.clients,
    selectClientsLoading: state => state.clientsLoading,
    selectReasons: state => state.reasons,
    selectReasonsLoading: state => state.reasonsLoading,
    selectSolutions: state => state.solutions,
    selectSolutionsLoading: state => state.solutionsLoading,
    selectCreateCardLoading: state => state.createCardLoading,
  }
});

export const listReducer = ListSlice.reducer;
export const {
  selectList,
  selectListLoading,
  selectClients,
  selectClientsLoading,
  selectReasons,
  selectReasonsLoading,
  selectSolutions,
  selectSolutionsLoading,
  selectCreateCardLoading
} = ListSlice.selectors;
export const { resetClients } = ListSlice.actions;
