import { Request, Response } from "express";
import Meal from "../models/meal.model";
import meal from "../types/meal.type";
import MealCatagory from "../models/meal_catagory.model";
import { RequestWithUser } from "../types/Request.interface";
import Staff from "../models/staff.model";

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

const getMealsOfUser = async (req: RequestWithUser, res: Response) => {
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

  await Meal.find({ User_id })
    .then(async (meals) => {
      const mealsData = [] as any[];
      await Promise.all(
        meals.map(async (meal) => {
          const mealData = JSON.parse(JSON.stringify(meal));
          const mealCatagory = await MealCatagory.findById(
            mealData.Catagory_id
          );
          if (mealCatagory) {
            mealsData.push({
              _id: mealData._id,
              User_id: mealData.User_id,
              Meal_desc: mealData.Meal_desc,
              Portion: mealData.Portion,
              Calories_intake: mealData.Calories_intake,
              Catagory_id: mealData.Catagory_id,
              Catagory_name: mealCatagory.Name,
            });
          }
        })
      );
      res.status(200).json(mealsData);
    })
    .catch((err) => {
      res.status(200).json([]);
    });
};
export default { generateMeal, getMeals, AddMeal, getMealsOfUser };
