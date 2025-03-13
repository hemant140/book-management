import express from "express";
import { changeBorrowStatus, borrowedBooks, deleteBorrowedBook, findBorrowedBookById, getBorrowedBooksList, getBorrowedBooksUserList, updateBorrowedBook, returnBorrowedBook } from "../controller/borrow.controller.js";
import verifyToken from "../middleware/verify-token.middleware.js";
import validateRequest from "../middleware/validation-request.middleware.js";
import { borrowSchema } from "../validations/validations.js";

const router = express.Router();

router.post("/", verifyToken, validateRequest(borrowSchema), borrowedBooks);

router.patch("/:bookId", verifyToken, returnBorrowedBook);

router.get("/", verifyToken, getBorrowedBooksUserList);

router.get("/list", verifyToken, getBorrowedBooksList);

router.get("/:borrowedBookId", verifyToken, findBorrowedBookById);

router.put("/:borrowedBookId", verifyToken, validateRequest(borrowSchema), updateBorrowedBook);

router.delete("/:borrowedBookId", verifyToken, deleteBorrowedBook);

router.put("/:borrowedBookId/:bookId/:status", verifyToken, changeBorrowStatus);

export default router;
