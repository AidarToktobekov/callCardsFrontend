import {createSlice} from "@reduxjs/toolkit";
import {getList} from "./listThunk.js";

const initialState = {
    list: [
        {
            id: 9,
            ls_abon: "12345",
            created_at: "2025-03-17 03:41:48",
            spec_full_name: "Бектур Раззаков",
            sip: "624",
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
            sip: "624",
            full_name: "Ерасыл Акимжанов",
            phone_number: "+996707777404",
            address: "Тилебалды-Ата, 9",
            comment: "",
            reason: "Не работает интернет",
            solution: "Замена бп/роутера заявка"
        },
    ],
    listLoading: false,
    listError: null,
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
    },
    selectors: {
        selectList: state => state.list,
        selectListLoading: state => state.listLoading,
        selectListError: state => state.listError,
    }
});

export const listReducer = ListSlice.reducer;
export const {
    selectList,
    selectListLoading,
    selectListError
} = ListSlice.selectors;
