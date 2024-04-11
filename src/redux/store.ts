import {configureStore} from '@reduxjs/toolkit'
import {thunk} from "redux-thunk";
import AssetsReducer from './assets/assetsSlice'
import {RootState} from "./types";
import {useSelector} from "react-redux";



export const store = configureStore({
    reducer: {
        assets: AssetsReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: thunk
            }
        })
})


export const useCustomSelector = (key: keyof RootState) => {
    const selector = useSelector((state: RootState) => state[key]);
    return selector
}