import { configureStore } from "@reduxjs/toolkit";
import editableDataReducer from "./features/editableData/editableDataSlice";

export const store = configureStore({
    reducer: {
        [editableDataReducer.name]: editableDataReducer,
    },
});