import {AssetModeEnum} from "../../pages/Assets/types";
import {createSlice} from "@reduxjs/toolkit";


type State = {
    currentAction: AssetModeEnum
}

const initialState = {
    currentAction: AssetModeEnum.NONE
}

const assetsActionsSlice = createSlice({
    name: 'assets_actions',
    initialState,
    reducers: {
        setCurrentAction: (state, action) => {
            state.currentAction = action.payload
        },
        setDefaultAction: (state) => {
            state.currentAction = AssetModeEnum.NONE
        },
    }
})

export const { setCurrentAction,setDefaultAction } = assetsActionsSlice.actions

export default assetsActionsSlice.reducer