import { createSlice } from "@reduxjs/toolkit";

const sampleSlice = createSlice({
    name: 'counter',
    initialState: 0,
    reducers: {
        increment: state => state + 1,
        decrement: state => state - 1
    }
});

const { actions, reducer } = sampleSlice
export const { increment, decrement } = actions

export const sampleSliceReducer = reducer;