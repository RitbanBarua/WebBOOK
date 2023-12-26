import { Router } from "express";
import { body, param } from "express-validator";
import { loginUser, logoutUser, registerUser } from "../controllers/User.controllers.js";
import authUser from "../middleware/authUser.js";

const router = Router();

router.route('/register').post(
    [
        body("username", 'Username must be atleast 5 characters').isLength({ min: 5 }).trim().escape(),
        body('firstName', 'First name must be atleast 2 characters').isLength({ min: 2 }).trim().escape(),
        body('lastName', 'Last name must be atleast 2 characters').optional().isLength({ min: 2 }).trim().escape(),
        body('email', 'Please enter a valid email address').normalizeEmail().isEmail(),
        body('password', 'Password must be at least 8 characters long').isLength({ min: 8 }).trim().escape(),
        body('mobile', 'Please enter a valid mobile no').isMobilePhone(),
        body('profilePicture').optional().isBase64()
    ],
    registerUser
);

router.route('/login').post(
    [
        body('email', 'Please enter a valid email address').normalizeEmail().isEmail(),
        body('password', 'Password must be at least 8 characters long').isLength({ min: 8 }).trim().escape()
    ],
    loginUser
);

router.route('/logout').post(
    authUser,          // Check if user is authenticated
    logoutUser
)


export default router;