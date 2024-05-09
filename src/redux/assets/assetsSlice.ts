import { createSlice } from '@reduxjs/toolkit';
import {AssetI} from "../../pages/Assets/types";

type State = {
    list: AssetI[]
}

const initialState: State  = {
    list: [{"name":"Solana","usdAmount":400,"assetAmount":2,"exchange":"Binance","tags":["Prob scam","Долгосрок"]},{"name":"BNB","usdAmount":600,"assetAmount":1,"exchange":"Binance","tags":["Долгосрок"]},{"name":"APT","usdAmount":200,"assetAmount":423,"exchange":"KuCoin","tags":["Prob scam","Fast Money"]},{"name":"USDT","usdAmount":1000,"assetAmount":1000,"exchange":"BitGet","tags":["Долгосрок"]},{"name":"PEPE","usdAmount":180,"assetAmount":2350000,"exchange":"BingX","tags":["Prob scam","MeMe","Fast Money"]}]
}

const assetsSlice = createSlice({
    name: 'assets',
    initialState: initialState,
    reducers: {
        addAssetReducer: (state,action) => {
            state.list = [...state.list, action.payload];
        },
        deleteAssetsReducer: (state, action) => {
            state.list = state.list.filter(i => action.payload.includes(i))
        },
        applyFilters: (state, action) => {
            // const {minUsd, maxUsd, chainName, creationDateOrder} = action.payload;
            // const getFromUsdRange = state.list.map()
        }
    }
})


export const { addAssetReducer,deleteAssetsReducer } = assetsSlice.actions

export default assetsSlice.reducer