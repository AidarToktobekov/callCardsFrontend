import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.js";
import {isAxiosError} from "axios";

export const getReasonsList = createAsyncThunk("reasonsAndSolutions/getReasons",
    async ()=>{
        try {
            const {data: reasons} = await axiosApi.get("actions_tree/reasons");

            return reasons;
        }catch(error){
            throw new Error(error);
        }
    }
);

export const getSolutionsList = createAsyncThunk("reasonsAndSolutions/getSolutions",
    async ()=>{
        try {
            const {data: solution} = await axiosApi.get("actions_tree/solutions");

            return solution;
        }catch(error){
            throw new Error(error);
        }
    }
);

export const createReason = createAsyncThunk("reasonsAndSolutions/createReason",
    async (reasonMutation, {rejectWithValue})=>{
        try {
            const {data: reason} = await axiosApi.post("/actions_tree/create_reason", reasonMutation);

            return reason;
        }catch(error){
            if (isAxiosError(error) && error.response && error.response.status === 400) {
                return rejectWithValue(error.response.data);
            }
            throw new Error(error);
        }
    }
);

export const createSolution = createAsyncThunk("reasonsAndSolutions/createSolution",
    async (solutionMutation, {rejectWithValue})=>{
        try {
            const {data: solution} = await axiosApi.post("/actions_tree/create_solution", solutionMutation);

            return solution;
        }catch(error){
            if (isAxiosError(error) && error.response && error.response.status === 400) {
                return rejectWithValue(error.response.data);
            }
            throw new Error(error);
        }
    }
);

export const deleteReason = createAsyncThunk("reasonsAndSolutions/deleteReason",
    async (id, {rejectWithValue})=>{
        try {
            const {data: reason} = await axiosApi.delete(   `/actions_tree/reasons/${id}`);

            return reason;
        }catch(error){
            if (isAxiosError(error) && error.response && error.response.status === 400) {
                return rejectWithValue(error.response.data);
            }
            throw new Error(error);
        }
    }
);

export const deleteSolution = createAsyncThunk("reasonsAndSolutions/deleteSolution",
    async (id, {rejectWithValue})=>{
        try {
            const {data: solution} = await axiosApi.delete(   `/actions_tree/solutions/${id}`);

            return solution;
        }catch(error){
            if (isAxiosError(error) && error.response && error.response.status === 400) {
                return rejectWithValue(error.response.data);
            }
            throw new Error(error);
        }
    }
);