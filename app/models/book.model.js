import mongoose, { Schema } from "mongoose";

const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true,
        lowercase: true,
    },
    genre: {
        type: String,
        required: true,
        lowercase: true,
    },
    publishYear: {
        type: Number,
        required: true,
    },
    isBorrowed: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

const Book = mongoose.model('Book', bookSchema);

export default Book;