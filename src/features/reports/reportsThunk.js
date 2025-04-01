import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.js";

export const getCardsReport = createAsyncThunk( "reports/getCardsReport",
    async()=>{
        try{
            const {data: cardsReport} = await axiosApi.get("/cards/report");
            return cardsReport || [];
        }
        catch(error){
            console.log(error)
        }
    });

export const getTreatmentReport = createAsyncThunk( "reports/getTreatmentReport",
    async()=>{
        try{
            const {data: treatmentReport} = await axiosApi.get("/cards/stats_by_reason");
            return treatmentReport || [];
        }
        catch(error){
            console.log(error)
        }
    });

export const getSolutionReport = createAsyncThunk( "reports/getSolutionReport",
    async()=>{
        try{
            const {data: solutionReport} = await axiosApi.get("/cards/stats_by_solution");
            return solutionReport || [];
        }
        catch(error){
            console.log(error)
        }
    });

export const getRepeatedCalls = createAsyncThunk( "reports/getRepeatedCalls",
    async()=>{
        try{
            const {data: repeatedCalls} = await axiosApi.get("/cards/repeated_calls");
            return repeatedCalls || [];
        }
        catch(error){
            console.log(error)
        }
    });

export const getCardsInactives = createAsyncThunk( "reports/getCardsInactives",
    async()=>{
        try{
            const {data: cardsInactives} = await axiosApi.get("/cards/inactives");
            return cardsInactives || [];
        }
        catch(error){
            console.log(error)
        }
    });