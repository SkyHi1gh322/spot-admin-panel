import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    visibility: {
        profile: {
            showAccountInfo: true,
            showPositionsDetails: true,
            showActivities: true,
            showSocials: true
        },
        assets: {
            showAssets: true,
        },
        sidebar: {
            showFavouriteTraders: true
        }
    }
}

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        updateFilters: (state, action) => {
            return {...state, ...action.payload}
        }
    }
})

export const { updateFilters } = settingsSlice.actions

export default settingsSlice.reducer