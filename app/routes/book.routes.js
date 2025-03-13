import express from "express";
import { changeBookBorrowStatus, createBook, deleteBook, findBookById, getBookList, updateBook } from "../controller/book.controller.js";
import verifyToken from "../middleware/verify-token.middleware.js";
import { bookSchema } from "../validations/validations.js";
import validateRequest from "../middleware/validation-request.middleware.js";

const router = express.Router();

router.post("/", verifyToken, validateRequest(bookSchema), createBook);

router.get("/", verifyToken, getBookList);

router.get("/:bookId", verifyToken, findBookById);

router.put("/:bookId", verifyToken, validateRequest(bookSchema), updateBook);

router.delete("/:bookId", verifyToken, deleteBook);

router.put("/:bookId/borrow-status", verifyToken, changeBookBorrowStatus);

export default router;
