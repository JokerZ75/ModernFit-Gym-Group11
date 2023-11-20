import { Request, Response } from "express";
import mealcatagoryController from "../Controllers/mealcatagory.controller";
import express from "express";
import Auth from "../Middlewares/Auth";

const router = express.Router();

router.route("/").get(Auth, mealcatagoryController.getMealCatagories);

router.route("/:id").get(Auth, mealcatagoryController.getMealCatagory);

module.exports = router;
