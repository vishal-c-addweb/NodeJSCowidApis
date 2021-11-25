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
];
