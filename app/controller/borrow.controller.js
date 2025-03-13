import * as borrowService from "../services/borrow.service.js"
import * as bookService from "../services/book.service.js"

export const borrowedBooks = async (req, res) => {
    try {
        const { bookId } = req.body;
        const { userId } = req


        const bookData = await bookService.findById(bookId);

        if (bookData.isBorrowed) {
            return res.status(400).json({ status: false, message: "This book is already borrowed" });
        }

        const response = await borrowService.createBorrowedBooks(userId, bookId);

        if (!response) {
            return res.status(400).json({ status: false, message: "Failed to create borrowed book" });
        }

        await bookService.changeBookBorrowStatus(bookId)

        return res.status(201).json({ status: true, message: "Borrowed book create successfully" });
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
};

export const returnBorrowedBook = async (req, res) => {
    try {

        const bookId = req.params.bookId;

        const response = await borrowService.returnBorrowedBook(req.userId, bookId);

        if (!response) {
            return res.status(400).json({ status: false, message: "Failed to return borrowed book" });
        }

        await bookService.changeBookBorrowStatus(bookId, false)

        return res.status(201).json({ status: true, message: "Borrowed book return successfully" });
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
};


export const getBorrowedBooksList = async (req, res) => {
    try {

        const { page, limit, search } = req.query;

        const response = await borrowService.getBorrowedBooksList(Number(page), Number(limit), search);

        return res.status(200).json({ status: true, data: response });
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
};

export const getBorrowedBooksUserList = async (req, res) => {
    try {

        const { userId } = req;

        const response = await borrowService.getBorrowedBooksUserList(userId);

        return res.status(200).json({ status: true, data: response });
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
};


export const findBorrowedBookById = async (req, res) => {
    try {
        const borrowedBookId = req.params.borrowedBookId;
        const response = await borrowService.findBorrowedBookById(borrowedBookId);

        if (!response) {
            return res.status(404).json({ status: false, message: "Borrowed book not found" });
        }

        return res.status(200).json({ status: true, data: response });
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
};


export const updateBorrowedBook = async (req, res) => {
    try {
        const borrowedBookId = req.params.borrowedBookId;
        const updateData = req.body;

        const updatedBorrowedBook = await borrowService.updateBorrowedBook(borrowedBookId, updateData);

        if (!updatedBorrowedBook) {
            return res.status(400).json({ status: false, message: "Failed to update borrowed book" });
        }

        return res.status(200).json({ status: true, message: "Borrowed book update successfully" });
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
};

export const deleteBorrowedBook = async (req, res) => {
    try {
        const borrowedBookId = req.params.borrowedBookId;

        const deletedBorrowedBook = await borrowService.deleteBorrowedBook(borrowedBookId);

        if (!deletedBorrowedBook) {
            return res.status(404).json({ status: false, message: "Borrowed book not found" });
        }

        return res.status(200).json({ status: true, message: "Borrowed book deleted successfully" });
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
};


export const changeBorrowStatus = async (req, res) => {
    try {
        const { borrowedBookId, bookId, status } = req.params;
        const updatedBorrowedBook = await borrowService.changeBorrowStatus(borrowedBookId, bookId, status);

        if (!updatedBorrowedBook) {
            return res.status(400).json({ status: false, message: "Failed to change borrow status" });
        }

        return res.status(200).json({ status: true, message: "Borrowed book status change successfully" });
    } catch (error) {
        return res.status(500).json({ status: false, message: "Internal server error" });
    }
};
