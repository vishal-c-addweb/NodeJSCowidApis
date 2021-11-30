import { Router } from "express";
import validateRequest from "../middleware/validateRequest";
import vaccineCenterApiController from "../controller/vaccineCenterApiController";
const vaccineCenterValidation = require('../validation/vaccineCenterValidation');
const router: Router = Router();

// @route   POST addvaccinecenter
// @desc    Give required fields, add vaccine center.
// @access  Public
router.post("/addvaccinecenter", vaccineCenterValidation.validationBodyRulesForAddCenter, validateRequest, vaccineCenterApiController.addvaccinecenter);

// @route   POST updatevaccinecenter
// @desc    Give required fields, update vaccine center.
// @access  Public
router.post("/updatevaccinecenter",vaccineCenterValidation.validationBodyRulesForUpdateCenter, validateRequest, vaccineCenterApiController.updatevaccinecenter);

// @route   POST center/pincode
// @desc    Give pinCode and filteration fields, fetch vaccine center.
// @access  Public
router.post("/center/pincode", vaccineCenterValidation.validationBodyRulesForGetCenterByPincode, validateRequest, vaccineCenterApiController.getcenterbypincode);

// @route   POST center/city&state
// @desc    Give city and state and filteration fields, fetch vaccine center.
// @access  Public
router.post("/center/city&state", vaccineCenterValidation.validationBodyRulesForGetCenterByCityState, validateRequest, vaccineCenterApiController.getcenterbycitystate);

export default router;