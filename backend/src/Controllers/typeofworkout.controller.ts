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


export default { getWorkoutTypesByID };