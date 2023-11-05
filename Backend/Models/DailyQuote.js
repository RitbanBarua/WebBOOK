import mongoose from "mongoose";

const quoteSchema = new mongoose.Schema({
    imgURL: 'string',
    quote: {type: 'string', required: true, unique: true},
    author: {type: 'string', required: true}
}, {'timestamps': true});

const Quote = mongoose.model('quote', quoteSchema);

export default Quote;