import {createSlice} from "@reduxjs/toolkit";
import {EditorState} from "prosemirror-state";

const initialState: EditorState[] = [];

export const newsSlice = createSlice({
    name:'news',
    initialState,
    reducers: {
        createNew: (state, action) => {
            return [...state, action.payload]
        },
    }
})

export const {createNew} = newsSlice.actions;
export default newsSlice.reducer