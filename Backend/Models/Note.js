import mongoose from "mongoose";
// import User from "./User";

const noteSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true, trim: true },
    category: { type: String, trim: true },
    priority: { type: String },
    author: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
}, {timestamps: true});

const Note = mongoose.model('Note', noteSchema);

export default Note;