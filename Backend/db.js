import mongoose from "mongoose";
import 'dotenv/config';

const mongoURI = process.env.MongoURI;

const connectToMongo = async()=>{
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to MongoDB Successfully");
    } catch (error) {
        console.log("Failed to Connect to MongoDB - ", error);
    }
}

export default connectToMongo;