import { combineReducers } from "@reduxjs/toolkit";
import loggedInStatusSlice from "./features/loggedInStatus/loggedInStatusSlice";
import editableDataSlice from "./features/editableData/editableDataSlice";
import userNotesSlice from "./features/userNotes/userNotesSlice";

const rootReducer = combineReducers({
    loggedInStatus: loggedInStatusSlice,
    editableNoteData: editableDataSlice,
    userNotes: userNotesSlice,
})

export default rootReducer;