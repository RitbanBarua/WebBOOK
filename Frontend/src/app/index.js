import { combineReducers } from "@reduxjs/toolkit";
import loggedInStatusSlice from "./features/loggedInStatus/loggedInStatusSlice";
import editableDataSlice from "./features/editableData/editableDataSlice";

const rootReducer = combineReducers({
    loggedInStatus: loggedInStatusSlice,
    editableNoteData: editableDataSlice,
})

export default rootReducer;