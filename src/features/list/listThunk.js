import {createAsyncThunk} from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.js";

export const getList = createAsyncThunk( "list/getAll",
    async()=>{
        try{
            const {data: list} = await axiosApi.get("/cards");
            return list || [];
        }
        catch(error){
            console.log(error)
        }
    });

export const getClient = createAsyncThunk("list/getClient",
    async (number)=>{
        try {
            const {data: client} = await axiosApi.get(`/hydra_seeker/${number}`);

            return client;
        }catch(error){
            throw new Error(error);
        }
    }
);

export const createCard = createAsyncThunk("list/createCard",
    async (cardMutation)=>{
        try {
            const {data: client} = await axiosApi.post("/cards/create_card", cardMutation);

            return client;
        }catch(error){
            throw new Error(error);
        }
    }
);

export const getReasons = createAsyncThunk("list/getReasons",
    async ()=>{
        try {
            const {data: reasons} = await axiosApi.get("actions_tree/reasons");

            return reasons;
        }catch(error){
            throw new Error(error);
        }
    }
);

export const getSolution = createAsyncThunk("list/getSolutions",
    async ()=>{
        try {
            const {data: solution} = await axiosApi.get("actions_tree/solutions");

            return solution;
        }catch(error){
            throw new Error(error);
        }
    }
);