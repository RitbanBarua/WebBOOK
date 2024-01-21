import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";

const app = express();
 const corsOptions = {
     origin: ['https://web-book-app.vercel.app', 'http://localhost:3000'],
     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
     credentials: true,
 };

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


// API Routes
import userRouter from './routes/User.routes.js'
import noteRouter from './routes/Note.routes.js'
import dailyQuoteRouter from './routes/DailyQuote.routes.js'

app.use('/api/v1/user', userRouter);
app.use("/api/v1/notes", noteRouter);
app.use('/api/v1/quotes', dailyQuoteRouter);


// Define a catch-all route for undefined routes
app.use((req, res) => {
    res.status(404).json({ success: false, message: "Route Not Found", docs: "https://github.com/RitbanBarua/WebBOOK/blob/main/Backend/Readme.md" });
});


export default app;