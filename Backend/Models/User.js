import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, trim: true },
    countryCode: {
        type: Number,
        required: true,
    },
    mobile: { type: Number },
    role: String,
    profilePicture: { type: String },
    staredNotes: [{ type: mongoose.Types.ObjectId, ref: 'Note' }]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;

// https://dev.to/alexmercedcoder/mongodb-relationships-using-mongoose-in-nodejs-54cc