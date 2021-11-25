export {};
const { check } = require('express-validator');

exports.validationBodyRules = [
    check('photoIdProof')
    .notEmpty()
    .withMessage('photoIdProof is required.')
    .bail(),

    check('photoIdNumber')
    .notEmpty()
    .withMessage('photoIdNumber is required.')
    .bail(),
    
    check('name')
    .notEmpty()
    .withMessage('name is required.')
    .bail(),
    
    check('gender')
    .notEmpty()
    .withMessage('gender is required.')
    .bail(),

    check('yearOfBirth')
    .trim()
    .notEmpty()
    .withMessage('yearOfBirth is required.')
    .bail()
    .isNumeric()
    .withMessage('yearOfBirth number must be numeric.')
    .bail()
    .isLength({max: 4, min: 4})
    .withMessage('yearOfBirth number must be 4 digits long.')
    .bail(),
];