import mongoose, { Schema } from "mongoose";

const borrowSchema = new mongoose.Schema({
    books: [{
        bookId: {
            type: Schema.Types.ObjectId,
            ref: 'Book',
            required: true
        },
        borrowedDate: {
            type: Date,
        },
        returnDate: {
            type: Date,
            default: null
        },
        status: {
            type: String,
            enum: ['borrowed', 'returned'],
            default: 'borrowed'
        }
    }],
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
}, { timestamps: true });

const Borrow = mongoose.model('Borrow', borrowSchema);

export default Borrow;