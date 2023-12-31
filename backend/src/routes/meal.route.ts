import { Request, Response } from "express";
import mealController from "../Controllers/meal.controller";
import express from "express";
import Auth from "../Middlewares/Auth";

const router = express.Router();

router.route("/user").get(Auth, mealController.getMeals);

router.route("/add").post(Auth, mealController.AddMeal);

router.route("/:id").get(Auth,mealController.getMealsOfUser);


module.exports = router;