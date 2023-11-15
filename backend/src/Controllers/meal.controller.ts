import { Request, Response } from "express";
import Meal from "../models/meal.model";
import meal from "../types/meal.type";


const generateMeal = async (req: Request, res: Response) => { // used for testing
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

const getMeals = async (req: Request, res: Response) => {
  const user = req.body.user;
  await Meal.find({ User_id: user.id })
    .then((meals) => {
      res.status(200).json(meals);
    })
    .catch((err) => {
      res.status(400).json({ msg: err });
    });
};

export default { generateMeal, getMeals };
