import {createSlice} from "@reduxjs/toolkit";
import {getCard, getList, getReasons, getSolution} from "./listThunk.js";

const initialState = {
    list: [],
    listLoading: false,
    card: null,
    cardLoading: false,
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
        builder.addCase(getCard.pending, (state)=>{
            state.cardLoading = true;
        });
        builder.addCase(getCard.fulfilled, (state, {payload: card})=>{
            state.cardLoading = false;
            state.card = card;
        });
        builder.addCase(getCard.rejected, (state)=>{
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
        selectCard: state => state.card,
        selectCardLoading: state => state.cardLoading,
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
    selectCard,
    selectCardLoading,
    selectReasons,
    selectReasonsLoading,
    selectSolutions,
    selectSolutionsLoading,
} = ListSlice.selectors;
