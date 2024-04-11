import { createSlice } from '@reduxjs/toolkit';
import {AssetI} from "../../pages/Assets/types";
import {Reducer} from "../types";

type State = {
    list: AssetI[]
}

const initialState: State  = {
    list: []
}

const assetsSlice = createSlice({
    name: 'assets',
    initialState: initialState,
    reducers: {
        addAssetReducer: (state,action) => {
            state.list = [...state.list, action.payload];
        },
        deleteAssetsReducer: (state, action) => {
            console.log(action.payload)
            state.list = state.list.filter(i => action.payload.includes(i))
        }
    }
})


export const { addAssetReducer,deleteAssetsReducer } = assetsSlice.actions

export default assetsSlice.reducer