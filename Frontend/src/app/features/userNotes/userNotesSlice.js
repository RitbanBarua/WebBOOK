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
            const noteIndex = state.userNotes.findIndex((note) => note.id === action.payload.id);
            if (noteIndex !== -1) {
                state.userNotes[noteIndex] = action.payload;
            }
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