import { Router } from "express";
import vaccineCenterApiController from "../controller/vaccineCenterApiController";
import validateRequest from "../middleware/validateRequest";
const vaccineCenterValidation = require('../validation/vaccineCenterValidation');
const router: Router = Router();

router.post("/addvaccinecenter", vaccineCenterValidation.validationBodyRulesForAddCenter, validateRequest, vaccineCenterApiController.addvaccinecenter);

router.post("/updatevaccinecenter",vaccineCenterValidation.validationBodyRulesForUpdateCenter, validateRequest, vaccineCenterApiController.updatevaccinecenter);

router.post("/center/pincode", vaccineCenterValidation.validationBodyRulesForGetCenterByPincode, validateRequest, vaccineCenterApiController.getcenterbypincode);

router.post("/center/city&state", vaccineCenterValidation.validationBodyRulesForGetCenterByCityState, validateRequest, vaccineCenterApiController.getcenterbycitystate);

export default router;