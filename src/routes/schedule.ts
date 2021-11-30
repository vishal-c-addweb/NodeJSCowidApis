import { Router } from "express";
import scheduleApiController from "../controller/scheduleApiController";
import validateRequest from "../middleware/validateRequest";
import authenticate from "../middleware/authenticate";
const sheduleValidation = require('../validation/scheduleValidation');
const router: Router = Router();

// @route   POST schedule
// @desc    Give JWT token & required fields, schedule vaccine dose as per request.
// @access  Private
router.post("/schedule", authenticate, sheduleValidation.validationBodyRules, validateRequest, scheduleApiController.schedule);

export default router;