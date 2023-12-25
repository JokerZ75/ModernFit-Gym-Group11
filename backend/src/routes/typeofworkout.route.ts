import express from "express";
import type_of_workoutController from "../Controllers/typeofworkout.controller";
import Auth from "../Middlewares/Auth";

const router = express.Router();

router.route("/:id").get(Auth, type_of_workoutController.getWorkoutTypesByID);

router.route("/").get(Auth, type_of_workoutController.getWorkoutTypes);

router.route("/data/generate").get(type_of_workoutController.generateWorkoutTypes);

module.exports = router;
