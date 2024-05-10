import {configureStore} from '@reduxjs/toolkit'
import {thunk} from "redux-thunk";
import AssetsReducer from './assets/assetsSlice'
import AssetsActionsReducer from './assets/assetsActionsSlice'
import SettingsReducer from './settings/settingsSlice';
import {RootState} from "./root_types";
import {
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
} from 'react-redux'


export const store = configureStore({
    reducer: {
        assets: AssetsReducer,
        assetsActions: AssetsActionsReducer,
        settings: SettingsReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            thunk: {
                extraArgument: thunk
            }
        })
})



export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector