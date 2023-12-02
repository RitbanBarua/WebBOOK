import { createSlice } from "@reduxjs/toolkit";

export const loadingStatusSlice = createSlice({
    name: "isLoading",
    initialState: {
        isLoading: false,
    },
    reducers: {
        setLoadingStatus(state, action) {
            state.isLoading = action.payload;
        },
    },
})

export const { setLoadingStatus } = loadingStatusSlice.actions;
export default loadingStatusSlice.reducer;