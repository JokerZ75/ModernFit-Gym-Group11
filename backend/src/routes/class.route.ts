import { Request, Response } from "express";
import classController from "../Controllers/class.controller";
import express from "express";
import Auth from "../Middlewares/Auth";

const router = express.Router();

router.route("/user").get(Auth, classController.getClasses);

router.route("/branch").get(Auth, classController.getClassesAtBranch);

router.route("/mark-interest/:id").post(Auth, classController.MarkInterested);

router
  .route("/mark-uninterest/:id")
  .post(Auth, classController.UnmarkInterested);


router.route("/add").post(Auth, classController.AddClass);

router.route("/cancel/:id").post(Auth, classController.cancelClass);

module.exports = router;
