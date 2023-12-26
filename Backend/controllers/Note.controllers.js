import Note from "../Models/Note.js";
import { validationResult } from "express-validator";


export const userNotes = async (req, res) => {
    try {
        const userId = req.userData.id;
        const notes = await Note.find({ author: userId }).sort("-createdAt").populate({
            path: "author",
            select: "-_id username firstName lastName email role profilePicture"
        });
        if (notes.length === 0) {
            return res.status(404).json({ success: false, message: "User Not Found or No Notes Found For This User" });
        }
        res.status(200).json({ success: true, notes: notes });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error!", error: error });
    }
}


export const createNote = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const userId = req.userData.id;
        const { title, content, category, priority } = req.body;
        const newNote = await Note.create({ title, content, category, priority, author: userId });
        res.status(201).json({ success: true, message: "New Note Created Successfully!", newNote: newNote });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error!", error: error });
    }
}


export const updateNote = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const noteId = req.params.noteId;
        const { title, content, category, priority } = req.body;
        let updatedNote = {};
        if (title) updatedNote["title"] = title;
        if (content) updatedNote["content"] = content;
        if (category) updatedNote["category"] = category;
        if (priority) updatedNote["priority"] = priority;
        const newUpdatedNote = await Note.findByIdAndUpdate(noteId, updatedNote, { new: true });
        if (!newUpdatedNote) {
            return res.status(404).json({ success: false, message: "Note Not Found" })
        }
        res.status(200).json({ success: true, message: "Note Updated Successfully!", updatedNote: newUpdatedNote });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error!", error: error });
    }
}


export const deleteNote = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const noteId = req.params.noteId;
        const deletedNote = await Note.findByIdAndDelete(noteId);
        if (!deletedNote) {
            return res.status(404).json({ success: false, message: "Note not found." });
        }
        res.status(200).json({ success: true, message: "Note Deletion successful.", deletedNote: deletedNote });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error!", error: error });
    }
}