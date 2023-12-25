import WorkoutPlan from "../models/workout_plan.model";
import { Request, Response } from "express";
import { RequestWithUser } from "../types/Request.interface";
import { getCacheAsJson, setCacheAsJson } from "../utils/cache";
import Staff from "../models/staff.model";

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

const sendWorkoutPlan = async (req: RequestWithUser, res: Response) => {
  const { User_id, Plan } = req.body;
  const user = req.user;
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  if (!User_id || !Plan) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  const isStaff = await Staff.findOne({ User_id: user.id });
  if (!isStaff) {
    return res.status(400).json({ msg: "User is not staff" });
  }
  if (isStaff.Position !== "Trainer") {
    return res.status(400).json({ msg: "User is not a trainer" });
  }
  const workoutPlan = {
    User_id: User_id,
    Staff_id: isStaff._id,
    Plan: Plan,
  };
  const newWorkoutPlan = new WorkoutPlan(workoutPlan);
  await newWorkoutPlan
    .save()
    .then(async (workoutPlan) => {
      // Update Cache
      const currentProgramRequest = await getCacheAsJson("programRequests");
      if (currentProgramRequest) {
        const nRequestData = {
          ...currentProgramRequest,
        };
        nRequestData[User_id] = {
          diet: nRequestData[User_id].diet,
          workout: false,
        };
        try {
          await setCacheAsJson("programRequests", nRequestData);
          // Unassign user from staff
          const staff = await Staff.findOneAndUpdate(
            { User_id: user.id },
            { $pull: { AssignedUsers: User_id } },
            { new: true }
          );
        } catch (err) {
          console.log(err);
        }
      }
      return res.status(200).json({ msg: "Workout plan sent" });
    })
    .catch((err) => {
      res.status(400).json({ msg: err });
    });
};

export default { getWorkoutPlan, sendWorkoutPlan };
