import express from 'express'
import { login, signup } from '../controller/auth.controller.js';
import { loginSchema, signupSchema } from '../validations/validations.js';
import validateRequest from '../middleware/validation-request.middleware.js';

const router = express.Router();

router.post('/signup', validateRequest(signupSchema), signup);
router.post('/login', validateRequest(loginSchema), login);


export default router;
