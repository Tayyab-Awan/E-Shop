import { body, validationResult } from 'express-validator';

const userValidation = (method) => {
    switch (method) {
        case 'register':
            return [
                body('name').exists().withMessage('name does no exists')
                    .isAlpha().withMessage('name should be alphabatic'),
                body('email').exists().withMessage('email does no exists')
                    .isEmail().withMessage('email is not valid'),
                body('password').exists().withMessage('password does no exists')
                    .isLength({ min: 5 }).withMessage('password should be atleast 5 characters'),
            ]
    }
}

const validate = (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty())
        next();

    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ msg: err.msg }))
    return res.status(422).json({
        errors: extractedErrors
    })

    // res.status(422);
    // throw new Error('Invalid Parameters');
}

export { userValidation, validate }