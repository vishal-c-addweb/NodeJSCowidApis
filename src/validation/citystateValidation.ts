export {};
const { check } = require('express-validator');

exports.validationBodyRulesForState = [
    check('countryName')
    .notEmpty()
    .withMessage('countryName is required.')
    .bail(),
];

exports.validationBodyRulesForCity = [
    check('countryName')
    .notEmpty()
    .withMessage('countryName is required.')
    .bail(),

    check('stateName')
    .notEmpty()
    .withMessage('stateName is required.')
    .bail(),
];