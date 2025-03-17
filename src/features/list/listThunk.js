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