import { createSlice } from "@reduxjs/toolkit";

export const editableDataSlice = createSlice({
    name: "editableData",
    initialState: {
        data: {}
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
            state.data = newData;
            //return {...action.payload};
        },
        // addItemToEditableData: (state, action) => {
        //     state.push(action.payload);
        // },
        // updateItemInEditableData: (state, action) => {
        //     let index = state.findIndex((item) => item._id === action.payload._id);
        //     if (index !== -1) {
        //         Object.assign(state[index], action.payload);
        //     } else {
        //         console.log("No Item Found");
        //     }

        // },
        deleteItemFromEditableData: (state, action) => {
            state.data = {};
            // let index = state.findIndex((item) => item._id === action.payload._id);
            // if (index !== -1) {
            //     state.splice(index, 1);
            // } else {
            //     console.log("No Item Found");
            // }
        },

    },
});

// Action creators are generated for each case reducer function
export const { setEditableData, deleteItemFromEditableData } = editableDataSlice.actions;

export default editableDataSlice.reducer;