import workoutController from "../Controllers/workout.controller";
import express from "express";
import Auth from '../Middlewares/Auth';

const router = express.Router();

router.route("/").get(workoutController.generateWorkout);

router.route("/user").get(Auth,workoutController.getWorkouts);


module.exports = router;