import staffController from "../Controllers/staff.controller";
import express from "express";
import Auth from "../Middlewares/Auth";

const router = express.Router();
router.route("/assigned/").get(Auth, staffController.getStaffAssignedUser);

router.route("/:id").get(Auth, staffController.getStaffById);

router.route("/generate/:id").get(staffController.GenerateStaff);


module.exports = router;
