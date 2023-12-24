import DietPlan from "../models/diet_plan.model";
import { Request, Response } from "express";
import { RequestWithUser } from "../types/Request.interface";
import Staff from "../models/staff.model";
import { getCacheAsJson, setCacheAsJson } from "../utils/cache";

const getDietPlan = async (req: RequestWithUser, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(200).json({ msg: "No user" });
  }
  await DietPlan.findOne({ User_id: user.id })
    .then((diet_plan) => {
      diet_plan = JSON.parse(JSON.stringify(diet_plan));
      if (!diet_plan) {
        return res.status(200).json({ msg: "No diet plan" });
      }
      res.status(200).json(diet_plan);
    })
    .catch((err) => {
      res.status(400).json({ msg: err });
    });
};


const sendDietPlan = async (req: RequestWithUser, res: Response) => {
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
  if (isStaff.Position !== "Nutritionist") {
    return res.status(400).json({ msg: "User is not a nutritionist" });
  }
  const dietPlan = {
    User_id: User_id,
    Staff_id: isStaff._id,
    Plan: Plan,
  };
  const newDietPlan = new DietPlan(dietPlan);
  await newDietPlan
    .save()
    .then(async (dietPlan) => {
      // Update Cache
      const currentProgramRequest = await getCacheAsJson("programRequests");
      if (currentProgramRequest) {
        const nRequestData = {
          ...currentProgramRequest,
        };
        nRequestData[User_id] = {
          diet: false,
          workout: nRequestData[User_id].workout,
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
      return res.status(200).json({ msg: "Diet plan sent" });
    })
    .catch((err) => {
      res.status(400).json({ msg: err });
    });
};

export default { getDietPlan, sendDietPlan };
