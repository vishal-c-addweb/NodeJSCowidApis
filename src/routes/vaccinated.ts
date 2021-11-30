import { Router } from "express";
import vaccinatedApiController from "../controller/vaccinatedApiController";
import validateRequest from "../middleware/validateRequest";
import authenticateUserAndAdmin from "../middleware/authenticateUserAndAdmin";
const vaccinatedValidation = require('../validation/vaccinatedValidation');
const router: Router = Router();

// @route   POST vaccinated
// @desc    Give JWT token & required fields, done vaccine.
// @access  Private
router.post("/vaccinated", authenticateUserAndAdmin, vaccinatedValidation.validationBodyRules, validateRequest, vaccinatedApiController.vaccinated);

export default router;