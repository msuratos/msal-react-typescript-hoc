import { configureStore } from "@reduxjs/toolkit";
import { sampleSliceReducer } from './sampleSlice';

export const store = configureStore({
    reducer: {sample: sampleSliceReducer}
});