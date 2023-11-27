import staffController from "../Controllers/staff.controller";
import express from "express";
import Auth from "../Middlewares/Auth";

const router = express.Router();

router.route("/:id").get(Auth, staffController.getStaffById);

module.exports = router;

