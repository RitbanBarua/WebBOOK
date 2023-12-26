import { Router } from "express";
import { body, param } from "express-validator";
import authUser from "../middleware/authUser.js";
import { createNote, deleteNote, updateNote, userNotes } from "../controllers/Note.controllers.js";

const router = Router();

router.route('/all').get(authUser, userNotes);

router.route('/new').post(
    authUser,
    [
        body('title', 'Enter a valid title ( min: 3, max: 255 )').trim().isLength({ min: 3, max: 255 }).escape(),
        body('content', 'Description must be atleast 5 characters').trim().isLength({ min: 5 }).escape()
    ],
    createNote
);

router.route('/:noteId').patch(
    authUser,
    [
        param('noteId', 'Invalid noteId').isMongoId(),
        body('title', 'Enter a valid title ( min: 3, max: 255 )').optional().trim().isLength({ min: 3, max: 255 }).escape(),
        body('content', 'Description must be atleast 5 characters').optional().trim().isLength({ min: 5 }).escape()
    ],
    updateNote
);

router.route('/:noteId').delete(
    authUser,
    [
        param('noteId', 'Invalid noteId').isMongoId()
    ],
    deleteNote
);


export default router;