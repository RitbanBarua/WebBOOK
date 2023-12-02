import { combineReducers } from "@reduxjs/toolkit";
import loggedInStatusSlice from "./features/loggedInStatus/loggedInStatusSlice";
import editableDataSlice from "./features/editableData/editableDataSlice";
import userNotesSlice from "./features/userNotes/userNotesSlice";
import loadingStatusSlice from "./features/loadingStatus/loadingStatusSlice";

const rootReducer = combineReducers({
    loggedInStatus: loggedInStatusSlice,
    loadingStatus: loadingStatusSlice,
    editableNoteData: editableDataSlice,
    userNotes: userNotesSlice,
})

export default rootReducer;