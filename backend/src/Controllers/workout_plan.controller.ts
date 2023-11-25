import WorkoutPlan from "../models/workout_plan.model";
import { Request, Response } from "express";
import { RequestWithUser } from "../types/Request.interface";

const generateWorkoutPlan = async (req: Request, res: Response) => {
  const nworkoutPlan = {
    User_id: "5f9e3b3b9d3b9b1b3c9d3b9b",
    Staff_id: "5f9e3b3b9d3b9b1b3c9d3b9b",
    Plan: {
      Monday: {
        WorkoutsList: ["Workout", "Workout", "Workout"],
      },
      Tuesday: {
        WorkoutsList: ["Workout", "Workout","Workout"],
      },
      Wednesday: {
        WorkoutsList: ["Workout", "Workout", "Workout"],
      },
      Thursday: {
        WorkoutsList: ["Workout", "Workout", "Workout"],
      },
      Friday: {
        WorkoutsList: ["Workout", "Workout", "Workout"],
      },
    },
  };
  const newWorkoutPlan = new WorkoutPlan(nworkoutPlan);

  try {
    const savedWorkoutPlan = await newWorkoutPlan.save();
    res.json(savedWorkoutPlan);
  } catch (err) {
    res.json({ message: err });
  }
};

const getWorkoutPlan = async (req: RequestWithUser, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  await WorkoutPlan.findOne({ User_id: user.id })
    .then((workoutPlan) => {
      if (!workoutPlan) {
        return res.status(200).json({ msg: "No workout plan" });
      }
      res.status(200).json(workoutPlan);
    })
    .catch((err) => {
      res.status(400).json({ msg: err });
    });
};

export default { generateWorkoutPlan, getWorkoutPlan };
