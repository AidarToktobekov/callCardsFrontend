import {createSlice} from "@reduxjs/toolkit";
import {getCardsReport, getSolutionReport, getTreatmentReport} from "./reportsThunk.js";

const initialState = {
    cardsReport: [],
    cardsReportLoading: false,
    treatmentReport: [],
    treatmentReportLoading: false,
    solutionReport: [],
    solutionReportLoading: false,
};

const ListSlice = createSlice({
    name: "reports",
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(getCardsReport.pending, (state)=>{
            state.cardsReportLoading = true;
        });
        builder.addCase(getCardsReport.fulfilled, (state, {payload: list})=>{
            state.cardsReportLoading = false;
            state.cardsReport = list;
        });
        builder.addCase(getCardsReport.rejected, (state)=>{
            state.cardsReportLoading = false;
        });
        builder.addCase(getTreatmentReport.pending, (state)=>{
            state.treatmentReportLoading = true;
        });
        builder.addCase(getTreatmentReport.fulfilled, (state, {payload: list})=>{
            state.treatmentReportLoading = false;
            state.treatmentReport = list;
        });
        builder.addCase(getTreatmentReport.rejected, (state)=>{
            state.treatmentReportLoading = false;
        });
        builder.addCase(getSolutionReport.pending, (state)=>{
            state.solutionReportLoading = true;
        });
        builder.addCase(getSolutionReport.fulfilled, (state, {payload: list})=>{
            state.solutionReportLoading = false;
            state.solutionReport = list;
        });
        builder.addCase(getSolutionReport.rejected, (state)=>{
            state.solutionReportLoading = false;
        });
    },
    selectors: {
        selectCardsReport: state => state.cardsReport,
        selectCardsReportLoading: state => state.cardsReportLoading,
        selectTreatmentReport: state => state.treatmentReport,
        selectTreatmentReportLoading: state => state.treatmentReportLoading,
        selectSolutionReport: state => state.solutionReport,
        selectSolutionReportLoading: state => state.solutionReportLoading,
    }
});

export const listReducer = ListSlice.reducer;
export const {
    selectCardsReport,
    selectCardsReportLoading,
    selectTreatmentReport,
    selectTreatmentReportLoading,
    selectSolutionReport,
    selectSolutionReportLoading,
} = ListSlice.selectors;
