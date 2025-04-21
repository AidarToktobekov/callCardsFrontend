import {createSlice} from "@reduxjs/toolkit";
import {
    getCardsInactives,
    getCardsReport,
    getRepeatedCalls,
    getSolutionReport,
    getTreatmentReport
} from "./reportsThunk.js";

const initialState = {
    cardsReport: [],
    cardsReportLoading: false,
    treatmentReport: [],
    treatmentReportLoading: false,
    solutionReport: [],
    solutionReportLoading: false,
    repeatedCalls: {
        total_results: null,
        total_pages: null,
        result: [],
    },
    repeatedCallsLoading: false,
    cardsInactives: [],
    cardsInactivesLoading: false,
};

const ReportsSlice = createSlice({
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
        builder.addCase(getRepeatedCalls.pending, (state)=>{
            state.solutionReportLoading = true;
        });
        builder.addCase(getRepeatedCalls.fulfilled, (state, {payload: list})=>{
            state.repeatedCallsLoading = false;
            state.repeatedCalls = list;
        });
        builder.addCase(getRepeatedCalls.rejected, (state)=>{
            state.repeatedCallsLoading = false;
        });
        builder.addCase(getCardsInactives.pending, (state)=>{
            state.cardsInactivesLoading = true;
        });
        builder.addCase(getCardsInactives.fulfilled, (state, {payload: list})=>{
            state.cardsInactivesLoading = false;
            state.cardsInactives = list;
        });
        builder.addCase(getCardsInactives.rejected, (state)=>{
            state.cardsInactivesLoading = false;
        });
    },
    selectors: {
        selectCardsReport: state => state.cardsReport,
        selectCardsReportLoading: state => state.cardsReportLoading,
        selectTreatmentReport: state => state.treatmentReport,
        selectTreatmentReportLoading: state => state.treatmentReportLoading,
        selectSolutionReport: state => state.solutionReport,
        selectSolutionReportLoading: state => state.solutionReportLoading,
        selectRepeatedCalls: state => state.repeatedCalls,
        selectRepeatedCallsLoading: state => state.repeatedCallsLoading,
        selectCardsInactives: state => state.cardsInactives,
        selectCardsInactivesLoading: state => state.cardsInactivesLoading,
    }
});

export const reportsReducer = ReportsSlice.reducer;
export const {
    selectCardsReport,
    selectCardsReportLoading,
    selectTreatmentReport,
    selectTreatmentReportLoading,
    selectSolutionReport,
    selectSolutionReportLoading,
    selectRepeatedCalls,
    selectRepeatedCallsLoading,
    selectCardsInactives,
    selectCardsInactivesLoading,
} = ReportsSlice.selectors;
