import workoutController from "../Controllers/workout.controller";
import express from "express";
import Auth from "../Middlewares/Auth";

const router = express.Router();


router.route("/user").get(Auth, workoutController.getWorkouts);

router.route("/add").post(Auth, workoutController.AddWorkout);

router.route("/:id").get(Auth,workoutController.getWorkoutsOfUser);

module.exports = router;
