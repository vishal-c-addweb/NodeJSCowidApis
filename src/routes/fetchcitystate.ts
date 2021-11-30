import { Router } from "express";
import fetchCityStateApiController from "../controller/fetchCityStateApiController";
import validateRequest from "../middleware/validateRequest";
const citystateValidation = require("../validation/citystateValidation");
const router: Router = Router();

// @route   GET states
// @desc    Give JWT token, returns the user data.
// @access  Public
router.get("/states", citystateValidation.validationBodyRulesForState, validateRequest, fetchCityStateApiController.fetchStateByCountry);

// @route   GET cities
// @desc    Give JWT token, returns the user data.
// @access  Public
router.get("/cities", citystateValidation.validationBodyRulesForCity, validateRequest, fetchCityStateApiController.fetchCityByStateAndCountry);

export default router;