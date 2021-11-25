import { Router } from "express";
import vaccinatedApiController from "../controller/vaccinatedApiController";
import validateRequest from "../middleware/validateRequest";
import authenticate from "../middleware/authenticate";
const vaccinatedValidation = require('../validation/vaccinatedValidation');
const router: Router = Router();

// @route   POST user
// @desc    Give JWT token & required fields, done vaccine.
// @access  Private
router.post("/vaccinated", authenticate, vaccinatedValidation.validationBodyRules, validateRequest, vaccinatedApiController.vaccinated);

export default router;