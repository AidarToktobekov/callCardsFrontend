import {createSlice} from "@reduxjs/toolkit";
import { getClient, getList, getReasons, getSolution} from "./listThunk.js";

const initialState = {
    list: [
        {
            id: 9,
            ls_abon: "12345",
            created_at: "2025-03-17 03:41:48",
            spec_full_name: "Бектур Раззаков",
            sip: 624,
            full_name: "Ерасыл Акимжанов",
            phone_number: "+996707777404",
            address: "Тилебалды-Ата, 9",
            comment: "",
            reason: "Исходящий звонок",
            solution: null
        },
        {
            id: 10,
            ls_abon: "12345",
            created_at: "2025-03-17 03:42:07",
            spec_full_name: "Бектур Раззаков",
            sip: 624,
            full_name: "Ерасыл Акимжанов",
            phone_number: "+996707777404",
            address: "Тилебалды-Ата, 9",
            comment: "",
            reason: "Не работает интернет",
            solution: "Замена бп/роутера заявка"
        },
    ],
    listLoading: false,
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
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(getList.pending, (state)=>{
            state.listLoading = true;
        });
        builder.addCase(getList.fulfilled, (state, {payload: list})=>{
            state.listLoading = false;
            state.list = list;
        });
        builder.addCase(getList.rejected, (state)=>{
            state.listLoading = false;
        });
        builder.addCase(getClient.pending, (state)=>{
            state.cardLoading = true;
        });
        builder.addCase(getClient.fulfilled, (state, {payload: client})=>{
            state.cardLoading = false;
            state.clients = client;
        });
        builder.addCase(getClient.rejected, (state)=>{
            state.cardLoading = false;
        });
        builder.addCase(getReasons.pending, (state)=>{
            state.reasonsLoading = true;
        });
        builder.addCase(getReasons.fulfilled, (state, {payload: reasons})=>{
            state.reasonsLoading = false;
            state.reasons = reasons;
        });
        builder.addCase(getReasons.rejected, (state)=>{
            state.reasonsLoading = false;
        });
        builder.addCase(getSolution.pending, (state)=>{
            state.solutionsLoading = true;
        });
        builder.addCase(getSolution.fulfilled, (state, {payload: solution})=>{
            state.solutionsLoading = false;
            state.solutions = solution;
        });
        builder.addCase(getSolution.rejected, (state)=>{
            state.solutionsLoading = false;
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
} = ListSlice.selectors;
