import { Request, Response } from "express";
import MealCatagory from "../models/meal_catagory.model";
import mealCatagory from "../types/mealCatagory.type";

const generateMealCatagory = async (req: Request, res: Response) => {
  const mealCatagory: mealCatagory = {
    Name: "MealCatagory",
    Avg_calories: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const newMealCatagory = new MealCatagory(mealCatagory);

  try {
    const savedMealCatagory = await newMealCatagory.save();
    res.json(savedMealCatagory);
  } catch (err) {
    res.json({ message: err });
  }
}; // used for testing

const getMealCatagories = async (req: Request, res: Response) => {
  await MealCatagory.find()
    .then((mealCatagories) => {
      res.status(200).json(mealCatagories);
    })
    .catch((err) => {
      res.status(400).json({
        msg: err,
      });
    });
};

export default {
  generateMealCatagory,
  getMealCatagories,
};
