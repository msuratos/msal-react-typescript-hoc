import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: '',
    reducers: {
        username: (state: any, action: PayloadAction<string>) => {
            state = action.payload;
            return state;
        }
    }
});

const { actions, reducer } = authSlice;
export const { username } = actions;

export const authSliceReducer = reducer;