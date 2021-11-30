import { Router } from "express";
import addmemberApiController from "../controller/addmemberApiController";
import validateRequest from "../middleware/validateRequest";
import authenticate from "../middleware/authenticate";
const memberValidation = require("../validation/memberValidation");
const router: Router = Router();

// @route   POST addmember
// @desc    Give JWT token & required fields, add member in members array.
// @access  Private
router.post("/addmember", authenticate, memberValidation.validationBodyRules, validateRequest, addmemberApiController.addMember);

// @route   POST deletemember
// @desc    Give JWT token & refId in query params, delete member.
// @access  Private
router.delete("/deletemember", authenticate, addmemberApiController.deleteMember);

export default router;