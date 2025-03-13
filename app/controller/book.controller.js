import * as bookService from "../services/book.service.js";


export const createBook = async (req, res) => {
    try {
        const payload = req.body;
        const book = await bookService.createBook(payload);

        if (!book) {
            return res.status(400).json({ status: false, message: "Book creation failed" });
        }

        return res.status(201).json({ status: true, message: "Book create successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};


export const getBookList = async (req, res) => {
    try {
        const { page, limit, search } = req.query;
        const response = await bookService.getBookList(Number(page), Number(limit), search);

        return res.status(200).json({ status: true, data: response });
    } catch (error) {
        console.log("Error in get book list", error.message);
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
};


export const findBookById = async (req, res) => {
    try {
        const bookId = req.params.bookId;

        const response = await bookService.findById(bookId);

        if (!response) {
            return res.status(404).json({ status: false, message: "Book not found" });
        }

        return res.status(200).json({ status: true, data: response });
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
};


export const updateBook = async (req, res) => {
    try {
        const bookId = req.params.bookId;
        const updateData = req.body;

        const response = await bookService.updateBook(bookId, updateData);

        if (!response) {
            return res.status(400).json({ status: false, message: "Failed to update book" });
        }

        return res.status(200).json({ status: true, message: "Book details update successfully" });
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
};


export const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.bookId;

        const response = await bookService.deleteBook(bookId);

        if (!response) {
            return res.status(404).json({ status: false, message: "Book not found" });
        }

        return res.status(200).json({ status: true, message: "Book deleted successfully" });
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
};


export const changeBookBorrowStatus = async (req, res) => {
    try {
        const bookId = req.params.bookId;

        const response = await bookService.changeBookBorrowStatus(bookId);

        if (!response) {
            return res.status(400).json({ status: false, message: "Failed to change borrow status" });
        }

        return res.status(200).json({ status: true, message: "Borrow status change successfully" });

    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
};
