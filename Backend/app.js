import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { body, param, validationResult } from "express-validator";
import connectToMongo from "./db.js";
import Quote from "./Models/DailyQuote.js";
import User from "./Models/User.js";
import Note from "./Models/Note.js";
import authUser from "./middleware/authUser.js";
import 'dotenv/config';

const app = express();
const port = process.env.PORT || 5000;
const saltRounds = 10;

// Define a custom password validation rule
// const validatePassword = (value) => {
//     // Define a regular expression to enforce password complexity rules
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&!])[A-Za-z\d@#$%^&!]{8,}$/;

//     if (!passwordRegex.test(value)) {
//         throw new Error('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character (@, #, $, %, ^, &, or !)');
//     }

//     return true;
// };

connectToMongo();

app.use(cors());
app.use(express.json());
app.use(cookieParser());


// Register New User
app.post("/register", [
    body("username", 'Username must be atleast 5 characters').isLength({ min: 5 }).trim().escape(),
    body('firstName', 'First name must be atleast 2 characters').isLength({ min: 2 }).trim().escape(),
    body('lastName', 'Last name must be atleast 2 characters').optional().isLength({ min: 2 }).trim().escape(),
    body('email', 'Please enter a valid email address').normalizeEmail().isEmail(),
    body('password', 'Password must be at least 8 characters long').isLength({ min: 8 }).trim().escape(),
    body('mobile', 'Please enter a valid mobile no').isMobilePhone(),
    body('profilePicture').optional().isBase64()
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);

    // If there are validation errors, return an error response
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    // If validation passed, continue with your route logic
    try {
        const { username, firstName, lastName, email, password, countryCode, mobile = "", profilePicture = "" } = req.body;

        // Check whether the user with this email exists already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success: false, message: "Sorry a user with this email already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user object and save it in database
        user = await User.create({
            username: username,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword,
            countryCode: countryCode,
            mobile: mobile,
            role: "User",
            profilePicture: profilePicture
        })
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.cookie('jwt', token, { httpOnly: true, secure: true }).status(201).json({ success: true, message: "New User Created Successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error!", error: error })
    }
})


// Login User
app.post('/login', [
    body('email', 'Please enter a valid email address').normalizeEmail().isEmail(),
    body('password', 'Password must be at least 8 characters long').isLength({ min: 8 }).trim().escape()
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);

    // If there are validation errors, return an error response
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    // If validation passed, continue with your route logic
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email: email });

        // Check if the user exists
        if (!user) {
            return res.status(401).json({ success: false, message: 'Invalid Email or Password' });
        }

        // Validate the password
        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass) {
            return res.status(401).json({ success: false, message: 'Invalid Email or Password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });

        // Assemble user data for the response
        const userData = {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            profilePicture: user.profilePicture,
            staredNotes: user.staredNotes
        }

        // Send the JWT token and user data as a response
        res.cookie('jwt', token, { httpOnly: true, secure: true }).status(200).json({ success: true, message: "Logged In Successfully!", userData: userData });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error!", error: error })
    }
})


// Fetch All User Notes Route
app.get("/notes/all/", authUser, async (req, res) => {
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
})


// Create New Note Route
app.post("/notes/new", authUser, [
    body('title', 'Enter a valid title ( min: 3, max: 255 )').trim().isLength({ min: 3, max: 255 }).escape(),
    body('content', 'Description must be atleast 5 characters').trim().isLength({ min: 5 }).escape()
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);

    // If there are validation errors, return an error response
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    // If validation passed, continue with your route logic
    try {
        const userId = req.userData.id;
        const { title, content, category, priority } = req.body;
        const newNote = await Note.create({ title, content, category, priority, author: userId });
        res.status(201).json({ success: true, message: "New Note Created Successfully!", newNote: newNote });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error!", error: error });
    }
})


// Update Existing Note Route - PATCH
app.patch("/notes/:noteId", authUser, [
    param('noteId', 'Invalid noteId').isMongoId(),
    body('title', 'Enter a valid title ( min: 3, max: 255 )').optional().trim().isLength({ min: 3, max: 255 }).escape(),
    body('content', 'Description must be atleast 5 characters').optional().trim().isLength({ min: 5 }).escape()
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);

    // If there are validation errors, return an error response
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    // If validation passed, continue with your route logic
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
        //res.status(200).json({ success: true, message: "Note Updated Successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error!", error: error });
    }
})


// Delete Existing Note Route - DELETE
app.delete('/notes/:noteId', authUser, [
    param('noteId', 'Invalid noteId').isMongoId()
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);

    // If there are validation errors, return an error response
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    // If validation passed, continue with your route logic
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
})


// Logout Route
app.post("/logout", authUser, async (req, res) => {
    try {
        // Clear the JWT token cookie
        res.clearCookie('jwt');

        // Return a success response
        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error!", error: error });
    }
})


// Daily Quote Route
app.get('/daily-quote', async (req, res) => {
    try {
        const quotes = await Quote.find();
        if (!quotes) {
            return res.status(404).json({ message: 'No quote found' });
        }
        const quotesCount = quotes.length;
        const randomIndex = Math.floor(Math.random() * quotesCount);
        res.json(quotes[randomIndex]);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!", error: error })
    }
})


// Define a catch-all route for undefined routes
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route Not Found", docs: "" });
});


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
})