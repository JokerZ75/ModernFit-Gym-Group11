import { Request, Response } from "express";
import Meal from "../models/meal.model";
import meal from "../types/meal.type";
import MealCatagory from "../models/meal_catagory.model";
import { RequestWithUser } from "../types/Request.interface";

const generateMeal = async (req: Request, res: Response) => {
  // used for testing
  const nmeal: meal = {
    User_id: "5f9e3b3b9d3b9b1b3c9d3b9b",
    Meal_desc: "Meal",
    Portion: 1,
    Calories_intake: 1,
    Catagory_id: "5f9e3b3b9d3b9b1b3c9d3b9b",
  };
  const newMeal = new Meal(nmeal);

  try {
    const savedMeal = await newMeal.save();
    res.json(savedMeal);
  } catch (err) {
    res.json({ message: err });
  }
};

const getMeals = async (req: RequestWithUser, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  await Meal.find({ User_id: user.id })
    .then((meals) => {
      res.status(200).json(meals);
    })
    .catch((err) => {
      res.status(400).json({ msg: err });
    });
};

const AddMeal = async (req: RequestWithUser, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  let { Meal_desc, Portion, Calories_intake, Catagory_id } = req.body;
  if (!Meal_desc || !Portion || !Catagory_id) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  if (
    Calories_intake == null ||
    Calories_intake == undefined ||
    Calories_intake == 0 ||
    Calories_intake == ""
  ) {
    try {
      Calories_intake = await MealCatagory.find({ _id: Catagory_id }).then(
        (catagory) => {
          const AvgCalories = JSON.parse(
            JSON.stringify(catagory[0])
          ).Avg_calories;
          return AvgCalories * Portion;
        }
      );
    } catch (err) {
      res.status(400).json({ msg: err });
    }
  }
  const newMeal = new Meal({
    User_id: user.id,
    Meal_desc,
    Portion,
    Calories_intake,
    Catagory_id,
  });

  // await new Promise((resolve, reject) => {setTimeout(resolve, 10000)});
  // return res.status(400).json({ msg: "Please enter all fields" });

  await newMeal
    .save()
    .then((meal) => {
      res.status(200).json({ msg: "Meal added successfully" });
    })
    .catch((err) => {
      res.status(400).json({ msg: err });
    });
};
export default { generateMeal, getMeals, AddMeal };
