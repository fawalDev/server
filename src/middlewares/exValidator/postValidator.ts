import { body } from "express-validator";

export const addPostValidator = [
    body('title')
        .trim()
        .notEmpty().withMessage('Title is require').bail(),

    body('content')
        .trim()
        .notEmpty().withMessage('Content is require').bail(),
]

export const updatePostValidator = [
    body('id')
        .trim()
        .notEmpty().withMessage('Id is missing').bail(),

    body('title')
        .trim()
        .notEmpty().withMessage('Title is required').bail(),

    body('content')
        .trim()
        .notEmpty().withMessage('Content is required').bail(),
]