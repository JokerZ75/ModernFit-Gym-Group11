import { Request, Response } from "express";
import User from "../models/user.model";
// import all models that have a relationship with the user model
import Workout from "../models/workout.model";
import Meal from "../models/meal.model";
import Staff from "../models/staff.model";
import Class from "../models/class.model";
import DietPlan from "../models/diet_plan.model";
import WorkoutPlan from "../models/workout_plan.model";
import NutritionalPost from "../models/nurtional_post.model";
import Notification from "../models/notification.model";

const getUser = async (req: Request, res: Response) => {
  const user = req.body.user;
  await User.findById(user.id)
    .then((user) => {
      user = JSON.parse(JSON.stringify(user));
      if (!user) {
        return res.status(200).json({ msg: "No user" });
      }
      const returnJSON = {
        Name: user.Name,
        Access_pin: user.Access_pin,
        Email: user.Email,
        Phone_number: user.Phone_number,
        Branch_id: user.Branch_id,
        Profile_picture: user.Profile_picture,
        Height: user.Height,
        Weight: user.Weight,
        Gym_Goals: user.Gym_Goals,
      };
      res.status(200).json(returnJSON);
    })
    .catch((err) => {
      res.status(400).json({ msg: err });
    });
};

const updateUser = async (req: Request, res: Response) => {
  const user = req.body.user;
  const {
    Name,
    Email,
    Phone_number,
    Branch_id,
    Profile_picture,
    Height,
    Weight,
    Gym_Goals,
  } = req.body;
  if (!Name || !Email || !Phone_number || !Branch_id) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  await User.findByIdAndUpdate(
    user.id,
    {
      Name,
      Email,
      Phone_number,
      Branch_id,
      Profile_picture,
      Height,
      Weight,
      Gym_Goals,
    },
    { new: true }
  )
    .then((user) => {
      user = JSON.parse(JSON.stringify(user));
      if (!user) {
        return res.status(200).json({ msg: "No user" });
      }
      return res.status(200).json({ msg: "User updated" });
    })
    .catch((err) => {
      res.status(400).json({ msg: err });
    });
};

const deleteUser = async (req: Request, res: Response) => {
  const user = req.body.user;
  const { Name } = req.body;
  const foundUser = await User.findById(user.id);
  if (!foundUser) {
    return res.status(200).json({ msg: "No user" });
  }
  if (foundUser.Name == Name) {
    // delete all data related to the user
    const isStaff = await Staff.findOne({ User_id: user.id });
    if (isStaff) {
      await Class.deleteMany({ Owner_id: isStaff._id });
      await NutritionalPost.deleteMany({ Staff_id: isStaff._id });
    }
    await Workout.deleteMany({ User_id: user.id });
    await Meal.deleteMany({ User_id: user.id });
    await DietPlan.deleteMany({ User_id: user.id });
    await WorkoutPlan.deleteMany({ User_id: user.id });
    await User.findByIdAndDelete(user.id);
    await Notification.updateMany({
      $pull: { Recievers: user.id },
    });
    return res.status(200).json({ msg: "User deleted" });
  }
};

export default { getUser, updateUser, deleteUser };
