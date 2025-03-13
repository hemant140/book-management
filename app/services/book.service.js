import Book from "../models/book.model.js"


export const createBook = async (payload) => {

    try {

        const response = await Book.create(payload)

        return response ? response : null

    } catch (error) {
        console.error("Something went wrong creating user", error.message)
        throw new Error("Internal server error");
    }
}

export const getBookList = async (page = 1, limit = 10, searchQuery = '') => {
    try {

        const searchFilter = {
            $or: [
                { title: { $regex: searchQuery, $options: 'i' } },
                { author: { $regex: searchQuery, $options: 'i' } }
            ]
        };

        const skip = (page - 1) * limit;

        const response = await Book.aggregate([
            { $match: searchFilter },
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: limit },
            {
                $project: {
                    __v: 0
                }
            }
        ]);

        const totalBooks = await Book.countDocuments(searchFilter);

        return {
            total: totalBooks,
            data: response,
        };
    } catch (error) {
        console.error("Something went wrong fetching books", error.message);
        throw new Error('Internal server error');
    }
};

export const findById = async (bookId) => {

    try {

        const response = await Book.findById({ _id: bookId })

        return response ? response : null

    } catch (error) {
        console.error("Something went wrong finding user", error.message)
        throw new Error("Internal server error");
    }
}

export const updateBook = async (bookId, updateData) => {
    try {

        const updatedBook = await Book.findByIdAndUpdate(bookId, updateData, {
            new: true,
            runValidators: true,
        });

        return updatedBook ? updatedBook : null;
    } catch (error) {
        console.error("Something went wrong updating the book", error.message);
        throw new Error("Internal server error");
    }
};


export const deleteBook = async (bookId) => {
    try {

        const response = await Book.findByIdAndDelete(bookId);

        return response ? response : null;
    } catch (error) {
        console.error("Something went wrong deleting the book", error.message);
        throw new Error("Internal server error");
    }
};


export const changeBookBorrowStatus = async (bookId, status = true) => {
    try {
        const book = await Book.findById(bookId);

        if (!book) {
            throw new Error("Book not found");
        }

        const response = await Book.findByIdAndUpdate(
            bookId,
            { isBorrowed: status }
        );

        return response ? response : null
    } catch (error) {
        console.error("Something went wrong changing the book's status", error.message);
        throw new Error("Internal server error");
    }
};





