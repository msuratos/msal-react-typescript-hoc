import { configureStore } from "@reduxjs/toolkit";
import { authSliceReducer } from "./authSlice";
import { sampleSliceReducer } from './sampleSlice';

export const store = configureStore({
    reducer: {
        sample: sampleSliceReducer,
        auth: authSliceReducer
    }
});