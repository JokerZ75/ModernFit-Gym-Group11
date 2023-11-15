import { Request, Response } from "express";
import Workout from "../models/workout.model";
import workout from "../types/workout.type";
import TypeOfWorkout from "../models/type_of_workout.model";

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

const AddWorkout = async (req: Request, res: Response) => {
  const user = req.body.user;
  let { Name, Duration, Type_of_workout, Calories_burned } = req.body;
  if (!Name || !Duration || !Type_of_workout) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  if (
    Calories_burned == null ||
    Calories_burned == undefined ||
    Calories_burned == 0 ||
    Calories_burned == ""
  ) {
    try {
      Calories_burned = await TypeOfWorkout.find({ _id: Type_of_workout }).then(
        (type) => {
          const AvgCalories = JSON.parse(
            JSON.stringify(type[0])
          ).Avg_calories_burned;
          return AvgCalories * Duration;
        }
      );
    } catch (err) {
      return res.status(400).json({ msg: err });
    }
  }
  const newWorkout = new Workout({
    User_id: user.id,
    Name,
    Duration,
    Type_of_workout,
    Calories_burned,
  });

  // await new Promise((resolve, reject) => {
  //   setTimeout(resolve, 10000);
  // });
  // return res.status(400).json({ msg: "Please enter all fields" });

  await newWorkout
    .save()
    .then((workout) => {
      res.status(200).json({ msg: "Workout added successfully" });
    })
    .catch((err) => {
      res.status(400).json({ msg: err });
    });
};

export default { generateWorkout, getWorkouts, AddWorkout };
