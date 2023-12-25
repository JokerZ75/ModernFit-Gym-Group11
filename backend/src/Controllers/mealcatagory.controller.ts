import { Request, Response } from "express";
import MealCatagory from "../models/meal_catagory.model";
import mealCatagory from "../types/mealCatagory.type";

const generateMealCatagory = async (req: Request, res: Response) => {
  // Random number between 1 and 500
  const mealCatagories: mealCatagory[] = [
    {
      Name: "Diary",
      Description: "Diary products",
      Avg_calories: Math.floor(Math.random() * 500) + 1,
    },
    {
      Name: "Fruits",
      Description: "Fruits",
      Avg_calories: Math.floor(Math.random() * 500) + 1,
    },
    {
      Name: "Vegetables",
      Description: "Vegetables",
      Avg_calories: Math.floor(Math.random() * 500) + 1,
    },
    {
      Name: "Meat",
      Description: "Meat",
      Avg_calories: Math.floor(Math.random() * 500) + 1,
    },
    {
      Name: "Fish",
      Description: "Fish",
      Avg_calories: Math.floor(Math.random() * 500) + 1,
    },
    {
      Name: "Grains",
      Description: "Grains",
      Avg_calories: Math.floor(Math.random() * 500) + 1,
    },
  ];
  await MealCatagory.insertMany(mealCatagories)
    .then(() => {
      res.status(200).json({ msg: "Meal catagories generated" });
    })
    .catch((err) => {
      console.log(err);
    });
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

const getMealCatagory = async (req: Request, res: Response) => {
  const mealCatagoryID = req.params.id;
  await MealCatagory.findById(mealCatagoryID)
    .then((mealCatagory) => {
      res.status(200).json(mealCatagory);
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
  getMealCatagory,
};
