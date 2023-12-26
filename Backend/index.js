import dotenv from "dotenv";
import connectToMongo from "./db/index.js";
import app from "./app.js";
dotenv.config({
    path: './.env'
})

const port = process.env.PORT || 5000;


connectToMongo()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running on ${port}`);
        })
    })
    .catch((error) => {
        console.error("Error while connecting to MongoDB !! ", error);
    });