import {createSlice} from "@reduxjs/toolkit";
import {
    createReason,
    createSolution, deleteReason,
    deleteSolution,
    getReasonsList,
    getSolutionsList
} from "./reasonsAndSolutionThunk.js";

const initialState = {
    reasons: [
        {
            id: '1',
            title: 'Б',
        },
        {
            id: '2',
            title: 'А',
        },
        {
            id: '3',
            title: 'В',
        }
    ],
    reasonsLoading: false,
    solutions: [],
    solutionsLoading: false,
    createSolutionLoading: false,
    createReasonLoading: false,
    deleteSolutionLoading: false,
    deleteReasonLoading: false,
    createSolutionError: null,
    createReasonError: null,
};

const ReasonsAndSolutionsSlice = createSlice({
    name: "reasonsAndSolutions",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(getReasonsList.pending, (state)=>{
            state.reasonsLoading = true;
        });
        builder.addCase(getReasonsList.fulfilled, (state, {payload: list})=>{
            state.reasonsLoading = false;
            state.reasons = list;
        });
        builder.addCase(getReasonsList.rejected, (state)=>{
            state.reasonsLoading = false;
        });
        builder.addCase(getSolutionsList.pending, (state)=>{
            state.solutionsLoading = true;
        });
        builder.addCase(getSolutionsList.fulfilled, (state, {payload: list})=>{
            state.solutionsLoading = false;
            state.solutions = list;
        });
        builder.addCase(getSolutionsList.rejected, (state)=>{
            state.solutionsLoading = false;
        });
        builder.addCase(createReason.pending, (state)=>{
            state.createReasonLoading = true;
        });
        builder.addCase(createReason.fulfilled, (state)=>{
            state.createReasonLoading = false;
        });
        builder.addCase(createReason.rejected, (state, {payload: error})=>{
            state.createReasonError = error;
            state.createReasonLoading = false;
        });
        builder.addCase(createSolution.pending, (state)=>{
            state.createSolutionLoading = true;
        });
        builder.addCase(createSolution.fulfilled, (state)=>{
            state.createSolutionLoading = false;
        });
        builder.addCase(createSolution.rejected, (state, {payload: error})=>{
            state.createSolutionError = error;
            state.createSolutionLoading = false;
        });
        builder.addCase(deleteSolution.pending, (state)=>{
            state.deleteSolutionLoading = true;
        });
        builder.addCase(deleteSolution.fulfilled, (state)=>{
            state.deleteSolutionLoading = false;
        });
        builder.addCase(deleteSolution.rejected, (state)=>{
            state.deleteSolutionLoading = false;
        });
        builder.addCase(deleteReason.pending, (state)=>{
            state.deleteReasonLoading = true;
        });
        builder.addCase(deleteReason.fulfilled, (state)=>{
            state.deleteReasonLoading = false;
        });
        builder.addCase(deleteReason.rejected, (state)=>{
            state.deleteReasonLoading = false;
        });
    },
    selectors: {
        selectReasonsList: state => state.reasons,
        selectReasonsListLoading: state => state.reasonsLoading,
        selectSolutionsList: state => state.solutions,
        selectSolutionsListLoading: state => state.solutionsLoading,
        selectCreateSolutionLoading: state => state.createSolutionLoading,
        selectCreateReasonLoading: state => state.createReasonLoading,
        selectDeleteSolutionLoading: state => state.deleteReasonLoading,
        selectDeleteReasonLoading: state => state.deleteSolutionLoading,
        selectCreateSolutionError: state => state.createReasonError,
        selectCreateReasonError: state => state.createSolutionError,
    }
});

export const reasonsAndSolutionsReducer = ReasonsAndSolutionsSlice.reducer;
export const {
    selectReasonsList,
    selectReasonsListLoading,
    selectSolutionsList,
    selectSolutionsListLoading,
    selectCreateSolutionLoading,
    selectCreateReasonLoading,
    selectDeleteSolutionLoading,
    selectDeleteReasonLoading,
    selectCreateSolutionError,
    selectCreateReasonError
} = ReasonsAndSolutionsSlice.selectors;
