import User from "../Models/User.js"
import { validationResult } from "express-validator";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const saltRounds = 10;


export const registerUser = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    // If validation passed, continue with your route logic
    try {
        const { username, firstName, lastName, email, password, countryCode, mobile = "", profilePicture = "" } = req.body;

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ success: false, message: "Sorry a user with this email already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);

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
        res.cookie('jwt', token, { httpOnly: true, secure: true, sameSite: 'None' }).status(201).json({ success: true, message: "New User Created Successfully!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error!", error: error })
    }
}


export const loginUser = async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });

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

        const userData = {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            profilePicture: user.profilePicture,
            staredNotes: user.staredNotes
        }

        res.cookie('jwt', token, { httpOnly: true, secure: true, sameSite: 'None' }).status(200).json({ success: true, message: "Logged In Successfully!", userData: userData });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error!", error: error })
    }
}


export const logoutUser = async (req, res) => {
    try {
        // Clear the JWT token cookie
        res.clearCookie('jwt');

        res.status(200).json({ success: true, message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error!", error: error });
    }
}