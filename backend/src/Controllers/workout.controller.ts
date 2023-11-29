import { Request, Response } from "express";
import Workout from "../models/workout.model";
import workout from "../types/workout.type";
import TypeOfWorkout from "../models/type_of_workout.model";
import { RequestWithUser } from "../types/Request.interface";
import Staff from "../models/staff.model";

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

const getWorkouts = async (req: RequestWithUser, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  await Workout.find({ User_id: user.id })
    .then((workouts) => {
      res.status(200).json(workouts);
    })
    .catch((err) => {
      res.status(400).json({ msg: err });
    });
};

const AddWorkout = async (req: RequestWithUser, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
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

const getWorkoutsOfUser = async (req: RequestWithUser, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  const isStaff = await Staff.findOne({ User_id: user.id });
  if (!isStaff) {
    return res.status(400).json({ msg: "User is not staff" });
  }
  if (isStaff.Position !== "Nutritionist" && isStaff.Position !== "Trainer") {
    return res.status(400).json({ msg: "User is not nutritionist or trainer" });
  }

  const User_id = req.params.id;

  await Workout.find({ User_id })
    .then(async (workouts) => {
      const workoutsData = [] as any[];
      await Promise.all(
        workouts.map(async (workout) => {
          const workoutData = JSON.parse(JSON.stringify(workout));
          const type = await TypeOfWorkout.findById(
            workoutData.Type_of_workout
          );
          if (type) {
            workoutsData.push({
              _id: workoutData._id,
              Name: workoutData.Name,
              User_id: workoutData.User_id,
              Duration: workoutData.Duration,
              Type_of_workout: workoutData.Type_of_workout,
              Type_of_workout_name: type.Name,
              Calories_burned: workoutData.Calories_burned,
              createdAt: workoutData.createdAt,
              updatedAt: workoutData.updatedAt,
            } as any);
          }
        })
      );
      res.status(200).json(workoutsData);
    })
    .catch((err) => {
      res.status(200).json([]);
    });
};

export default { generateWorkout, getWorkouts, AddWorkout, getWorkoutsOfUser };
