export {};
const { check } = require('express-validator');

exports.validationBodyRules = [
    check('secretCode')
    .trim()
    .notEmpty()
    .withMessage('secretCode is required.')
    .bail()
    .isNumeric()
    .withMessage('secretCode number must be numeric.')
    .bail()
    .isLength({max: 4, min: 4})
    .withMessage('secretCode number must be 4 digits long.')
    .bail(),


    check('dose')
    .notEmpty()
    .withMessage('dose is required.')
    .bail()
];