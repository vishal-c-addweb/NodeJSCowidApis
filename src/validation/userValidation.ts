export {};
const Schema = require("schema-js");
const { body,check } = require('express-validator');

exports.validationBodyRules = [
    check('mobile')
    .trim()
    .notEmpty()
    .withMessage('mobile is required.')
    .bail()
    .isNumeric()
    .withMessage('mobile number must be numeric.')
    .bail()
    .isLength({max: 10, min: 10})
    .withMessage('mobile number must be 10 digits long.')
    .bail(),
    
    check('password')
    .trim()
    .notEmpty()
    .withMessage('password is required.')
    .bail()
    .isLength({min: 8})
    .withMessage('password is minimum 8 digits long.')
    .bail()
    .matches(/(?=.*?[A-Z])/).withMessage('At least one Uppercase is required')
    .matches(/(?=.*?[a-z])/).withMessage('At least one Lowercase is required')
    .matches(/(?=.*?[0-9])/).withMessage('At least one Number is required')
    .matches(/(?=.*?[#?!@$%^&*-])/).withMessage('At least one special character is required')
    .not().matches(/^$|\s+/).withMessage('White space not allowed')
];
