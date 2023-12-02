import workout_planController from "../Controllers/workout_plan.controller";
import { Router } from "express";
import Auth from "../Middlewares/Auth";

const router = Router();

router.route("/").get(Auth, workout_planController.getWorkoutPlan);

router.route("/generate").get(workout_planController.generateWorkoutPlan);

router.route("/send").post(Auth, workout_planController.sendWorkoutPlan);

module.exports = router;