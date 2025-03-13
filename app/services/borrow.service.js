import mongoose from "mongoose";
import Borrow from "../models/borrow-book.model.js";

export const createBorrowedBooks = async (userId, bookId) => {
    const books = {
        bookId: bookId,
        status: 'borrowed',
        borrowedDate: new Date()
    };

    try {
        let borrowRecord = await Borrow.findOne({ userId });

        if (!borrowRecord) {
            borrowRecord = await Borrow.create({
                userId,
                books: [books]
            });
            return borrowRecord;
        } else {
            const bookIndex = borrowRecord.books.findIndex(book => book.bookId.equals(bookId));

            if (bookIndex !== -1) {
                borrowRecord.books[bookIndex].status = 'borrowed';
                borrowRecord.books[bookIndex].borrowedDate = new Date();
            } else {
                borrowRecord.books.push(books);
            }
            await borrowRecord.save();
            return borrowRecord;
        }
    } catch (error) {
        console.error("Something went wrong creating borrowed books", error.message);
        throw new Error("Internal server error");
    }
};


export const returnBorrowedBook = async (userId, bookId) => {
    try {

        let borrowRecord = await Borrow.findOne({ userId });

        console.log(borrowRecord, "heloo")

        if (!borrowRecord) {
            throw new Error("No borrow record found for the user");
        }

        console.log(bookId, "bookis")

        const bookObjectId = new mongoose.Types.ObjectId(bookId);

        const bookIndex = borrowRecord.books.findIndex(book => book.bookId.equals(bookObjectId));

        console.log(bookObjectId, "ubgfghj")

        if (bookIndex === -1) {
            throw new Error("Book not found in borrow record");
        }

        borrowRecord.books[bookIndex].status = 'returned';
        borrowRecord.books[bookIndex].returnDate = new Date();

        await borrowRecord.save();

        return borrowRecord;

    } catch (error) {
        console.error("Something went wrong returning borrowed book", error.message);
        throw new Error("Internal server error");
    }
};




export const getBorrowedBooksList = async (page = 1, limit = 10) => {
    try {

        const skip = (page - 1) * limit;

        console.log(skip, "skip", page, limit)

        const response = await Borrow.find();

        return response ? response : []
    } catch (error) {
        console.error("Something went wrong fetching borrowed books", error.message);
        throw new Error("Internal server error");
    }
};

export const getBorrowedBooksUserList = async (userId) => {
    try {

        const response = await Borrow.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId) } },
            { $unwind: '$books' },
            {
                $lookup: {
                    from: 'books',
                    localField: 'books.bookId',
                    foreignField: '_id',
                    as: 'bookDetails'
                }
            },
            {
                $project: {
                    _id: 1,
                    userId: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    bookDetails: 1
                }
            }
        ]);


        return response ? response : null
    } catch (error) {
        console.error("Something went wrong fetching borrowed books", error.message);
        throw new Error("Internal server error");
    }
};


export const findBorrowedBookById = async (borrowedBookId) => {
    try {
        const response = await Borrow.findById(borrowedBookId);
        return response ? response : null;
    } catch (error) {
        console.error("Something went wrong finding borrowed book", error.message);
        throw new Error("Internal server error");
    }
};

export const updateBorrowedBook = async (borrowedBookId, updateData) => {
    try {
        const updatedBorrowedBook = await Borrow.findByIdAndUpdate(borrowedBookId, updateData, {
            new: true,
            runValidators: true,
        });

        return updatedBorrowedBook ? updatedBorrowedBook : null;
    } catch (error) {
        console.error("Something went wrong updating borrowed book", error.message);
        throw new Error("Internal server error");
    }
};


export const deleteBorrowedBook = async (borrowedBookId) => {
    try {
        const response = await Borrow.findByIdAndDelete(borrowedBookId);
        return response ? response : null;
    } catch (error) {
        console.error("Something went wrong deleting borrowed book", error.message);
        throw new Error("Internal server error");
    }
};


export const changeBorrowStatus = async (borrowedBookId, bookId, status) => {
    try {

        const response = await Borrow.findOneAndUpdate(
            { _id: borrowedBookId, 'books.bookId': bookId },
            { $set: { 'books.$.status': status, 'books.$.returnDate': status === 'returned' ? new Date() : null } },
            { new: true }
        );
        return response ? response : null;
    } catch (error) {
        console.error("Something went wrong changing borrow status", error.message);
        throw new Error("Internal server error");
    }
};
