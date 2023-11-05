//import express from 'express';
import jwt from 'jsonwebtoken';
//import cookieParser from 'cookie-parser';
import 'dotenv/config';

//const app = express();
const SECRET_KEY = process.env.SECRET_KEY;

//app.use(cookieParser());

const authUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        return res.status(403).json({ success: false, message: "Unauthorized Access Denied!" });
    }
    try {
        const decodedToken = jwt.verify(token, SECRET_KEY);
        if (!decodedToken || !decodedToken.id) {
            return res.status(403).json({ success: false, message: "Unauthorized Access Denied!" });
        }
        req.userData = decodedToken;
        next();
    } catch (error) {
        return res.status(500).json({ seccess: false, message: "Internal Server Error!", error: error });
    }
}

export default authUser;