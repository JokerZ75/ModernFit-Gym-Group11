import { Request, Response } from "express";
import Workout from "../models/workout.model";
import workout from "../types/workout.type";

const generateWorkout = async (req: Request, res: Response) => {
  const workout: workout = {
    Name: "Workout",
    User_id: "5f9e3b3b9d3b9b1b3c9d3b9b",
    Duration: 1,
    Type_of_workout: "5f9e3b3b9d3b9b1b3c9d3b9b",
    Calories_burned: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const newWorkout = new Workout(workout);

  try {
    const savedWorkout = await newWorkout.save();
    res.json(savedWorkout);
  } catch (err) {
    res.json({ message: err });
  }
};

const getWorkouts = async (req: Request, res: Response) => {
  const user = req.body.user;
  await Workout.find({ User_id: user.id })
    .then((workouts) => {
      res.status(200).json(workouts);
    })
    .catch((err) => {
      res.status(400).json({ msg: err });
    });
};

export default { generateWorkout, getWorkouts };
