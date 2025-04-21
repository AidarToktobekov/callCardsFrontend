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
    async(listPage)=>{
        try{
            const {data: repeatedCalls} = await axiosApi.get(`/cards/repeated_calls?page=${listPage}&page_size=${100}`);
            return repeatedCalls || [];
        }
        catch(error){
            console.log(error)
        }
    });

export const getCardsInactives = createAsyncThunk( "reports/getCardsInactives",
    async(listPage)=>{
        try{
            const {data: cardsInactives} = await axiosApi.get(`/cards/inactives?page=${listPage}&page_size=${100}`);
            return cardsInactives || [];
        }
        catch(error){
            console.log(error)
        }
    });