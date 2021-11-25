export {};
const { body,check } = require('express-validator');

exports.validationBodyRulesForAddCenter = [
    check('centerName')
    .notEmpty()
    .withMessage('centerName is required.')
    .bail(),

    check('address')
    .notEmpty()
    .withMessage('address is required.')
    .bail(),
    
    check('name')
    .notEmpty()
    .withMessage('name is required.')
    .bail(),
    
    check('dose1')
    .notEmpty()
    .withMessage('dose1 is required.')
    .bail()
    .isNumeric()
    .withMessage('pinCode number must be numeric.')
    .bail(),
    
    check('dose2')
    .notEmpty()
    .withMessage('dose2 is required.')
    .bail()
    .isNumeric()
    .withMessage('pinCode number must be numeric.')
    .bail(),
    
    check('age')
    .notEmpty()
    .withMessage('age is required.')
    .bail(),
    
    check('cost')
    .notEmpty()
    .withMessage('cost is required.')
    .bail(),
    
    check('state')
    .notEmpty()
    .withMessage('state is required.')
    .bail(),
    
    check('city')
    .notEmpty()
    .withMessage('city is required.')
    .bail(),
    
    check('pinCode')
    .trim()
    .notEmpty()
    .withMessage('pinCode is required.')
    .bail()
    .isNumeric()
    .withMessage('pinCode number must be numeric.')
    .bail()
    .isLength({max: 6, min: 6})
    .withMessage('pinCode number must be 6 digits long.')
    .bail(),
];

exports.validationBodyRulesForUpdateCenter = [
    check('centerId')
    .notEmpty()
    .withMessage('centerId is required.')
    .bail(),
    
    check('date')
    .notEmpty()
    .withMessage('date is required.')
    .bail(),
    
    check('name')
    .notEmpty()
    .withMessage('name is required.')
    .bail(),
    
    check('dose1')
    .notEmpty()
    .withMessage('dose1 is required.')
    .bail()
    .isNumeric()
    .withMessage('pinCode number must be numeric.')
    .bail(),
    
    check('dose2')
    .notEmpty()
    .withMessage('dose2 is required.')
    .bail()
    .isNumeric()
    .withMessage('pinCode number must be numeric.')
    .bail(),
    
    check('age')
    .notEmpty()
    .withMessage('age is required.')
    .bail(),
];

exports.validationBodyRulesForGetCenterByPincode = [
    check('pinCode')
    .trim()
    .notEmpty()
    .withMessage('pinCode is required.')
    .bail()
    .isNumeric()
    .withMessage('pinCode number must be numeric.')
    .bail()
    .isLength({max: 6, min: 6})
    .withMessage('pinCode number must be 6 digits long.')
    .bail(),
];

exports.validationBodyRulesForGetCenterByCityState = [
    check('state')
    .notEmpty()
    .withMessage('state is required.')
    .bail(),
    
    check('city')
    .notEmpty()
    .withMessage('city is required.')
    .bail(),
];
