import {CaseReducer, PayloadAction} from "@reduxjs/toolkit";
import {store} from "./store";

export type Reducer<S, A> = CaseReducer<S, PayloadAction<A>>;


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

