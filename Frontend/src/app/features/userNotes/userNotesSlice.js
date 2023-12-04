import { createSlice } from "@reduxjs/toolkit";

export const userNotesSlice = createSlice({
    name: "userNotes",
    initialState: {
        userNotes: [],
    },
    reducers: {
        setUserNotes: (state, action) => {
            state.userNotes = action.payload;
        },
        addUserNote: (state, action) => {
            state.userNotes.push(action.payload);
        },
        updateUserNote: (state, action) => {
            const indexToUpdate = state.userNotes.findIndex((note) => note._id === action.payload._id);
            if (indexToUpdate !== -1) {
                state.userNotes[indexToUpdate] = action.payload;
            } else {
                console.log("Could not find the note to update");
            };
        },
        removeUserNote: (state, action) => {
            state.userNotes = state.userNotes.filter(
                (note) => note._id !== action.payload
            );
        },
        resetUserNotes: (state) => {
            state.userNotes = [];
        }
    },
})


export const { setUserNotes, addUserNote, updateUserNote, removeUserNote, resetUserNotes } = userNotesSlice.actions;
export default userNotesSlice.reducer;