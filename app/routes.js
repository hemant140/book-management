import express from 'express'
import authRouter from '../app/routes/auth.routes.js'
import bookRouter from '../app/routes/book.routes.js'
import borrowRouter from '../app/routes/borrow.routes.js'

const router = express.Router()


router.use('/auth', authRouter);
router.use('/borrow', borrowRouter);
router.use('/book', bookRouter);

export default router;
