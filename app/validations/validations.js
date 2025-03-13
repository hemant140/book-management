import Joi from "joi";

const signupSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    username: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
    password: Joi.string().required(),
    username: Joi.string().required(),
});

const bookSchema = Joi.object({
    title: Joi.string().min(3).required(),
    author: Joi.string().required(),
    genre: Joi.string().required(),
    publishYear: Joi.number().required(),
    isBorrowed: Joi.boolean().allow(null, '')
});

const borrowSchema = Joi.object({
    bookId: Joi.string().required(),
});


export { signupSchema, bookSchema, borrowSchema, loginSchema };