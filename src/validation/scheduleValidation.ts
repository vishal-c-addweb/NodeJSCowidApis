export {};
const { check } = require('express-validator');

exports.validationBodyRules = [
    check('address')
    .notEmpty()
    .withMessage('address is required.')
    .bail(),

    check('vaccineType')
    .notEmpty()
    .withMessage('vaccineType is required.')
    .bail(),

    check('age')
    .notEmpty()
    .withMessage('age is required.')
    .bail(),

    check('cost')
    .notEmpty()
    .withMessage('cost is required.')
    .bail(),
    
    check('date')
    .notEmpty()
    .withMessage('date is required.')
    .bail(),
    
    check('timeSlot')
    .notEmpty()
    .withMessage('timeSlot is required.')
    .bail(),

    check('refId')
    .trim()
    .notEmpty()
    .withMessage('refId is required.')
    .bail()
    .isNumeric()
    .withMessage('refId number must be numeric.')
    .bail()
    .isLength({max: 13, min: 13})
    .withMessage('refId number must be 13 digits long.')
    .bail(),
];