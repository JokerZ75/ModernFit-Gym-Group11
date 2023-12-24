import TypeOfWorkout from "../models/type_of_workout.model";
import type_of_workout from "../types/type_of_workout.type";
import { Request, Response } from "express";

const getWorkoutTypesByID = async (req: Request, res: Response) => {
  const id = req.params.id;
  await TypeOfWorkout.findById(id)
    .then((workout) => {
      res.status(200).json(workout);
    })
    .catch((err) => {
      res.status(400).json({ msg: err });
    });
};

const getWorkoutTypes = async (req: Request, res: Response) => {
  await TypeOfWorkout.find()
    .then((workouts) => {
      res.status(200).json(workouts);
    })
    .catch((err) => {
      res.status(400).json({ msg: err });
    });
};

const generateWorkoutTypes = async (req: Request, res: Response) => {
  const workoutTypes: type_of_workout[] = [
    {
      Name: "Chest",
      Avg_calories_burned: 100,
    },
    {
      Name: "Back",
      Avg_calories_burned: 100,
    },
    {
      Name: "Shoulders",
      Avg_calories_burned: 100,
    },
    {
      Name: "Legs",
      Avg_calories_burned: 100,
    },
    {
      Name: "Biceps",
      Avg_calories_burned: 100,
    },
    {
      Name: "Triceps",
      Avg_calories_burned: 100,
    },
  ];
  await TypeOfWorkout.insertMany(workoutTypes)
    .then(() => {
      res.status(200).json({ msg: "Workout types generated" });
    })
    .catch((err) => {
      console.log(err);
    });
};

export default { getWorkoutTypesByID, getWorkoutTypes, generateWorkoutTypes };
