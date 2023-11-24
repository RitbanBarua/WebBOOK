import { createSlice } from "@reduxjs/toolkit";

export const editableDataSlice = createSlice({
    name: "editableData",
    initialState: {
        editableData: {}
    },
    reducers: {
        setEditableData: (state, action) => {
            const newData = {
                id: action.payload.id,
                title: action.payload.title,
                content: action.payload.content,
                category: action.payload.category,
                priority: action.payload.priority
            }
            state.editableData = newData;
        },

        deleteEditableData: (state, action) => {
            state.editableData = {};
        },

    },
});

// Action creators are generated for each case reducer function
export const { setEditableData, deleteEditableData } = editableDataSlice.actions;

export default editableDataSlice.reducer;